import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chessground } from 'chessground';
import { Chess, Move } from 'chess.js'; // Import Chess Engine
import { getLessonById } from '../data/lessons';
import { supabase } from '../lib/supabase';
import { playAudio } from '../lib/sounds'; // Import Sound Utility
import Swal from 'sweetalert2';
import '../index.css';
// Import Consolidated Chessground Styles
import '../assets/chessground.css';

// Interface for our Supabase puzzle
interface Puzzle {
    id: string;
    fen: string;
    moves: string;
    rating: number;
    temas: string[];
}

// Helper: Convert chess.js moves to Chessground Dests
function toDests(chess: Chess): Map<string, string[]> {
    const dests = new Map();
    chess.moves({ verbose: true }).forEach((m: any) => {
        if (!dests.has(m.from)) dests.set(m.from, []);
        dests.get(m.from).push(m.to);
    });
    return dests;
}

// --- SUB-COMPONENT: ACTIVE PUZZLE (Handles logic for ONE specific puzzle) ---
// This ensures a complete "hard reset" of state/refs when the puzzle changes.
const ActivePuzzle: React.FC<{
    puzzle: Puzzle;
    onSuccess: () => void;
    onFail: () => void;
}> = ({ puzzle, onSuccess, onFail }) => {
    const boardRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<any>(null);
    const moveProgress = useRef(1); // Track user moves (start at 1 because 0 is opponent's opening)

    // Local State
    const [chess, setChess] = useState<Chess | null>(null);
    const [userTurn, setUserTurn] = useState<'white' | 'black'>('white');
    const [status, setStatus] = useState<'agent' | 'user' | 'success' | 'fail' | 'error'>('agent');
    const [errorMsg, setErrorMsg] = useState<string>('');

    // Setup Board & Game Logic
    useEffect(() => {
        if (!boardRef.current) return;

        let engine: Chess;
        try {
            engine = new Chess(puzzle.fen);
            setChess(engine);
        } catch (e) {
            console.error("Invalid FEN:", puzzle.fen);
            setStatus('error');
            setErrorMsg('Error: Posición de ajedrez inválida.');
            return;
        }

        // 1. Parse Data
        // Robust moves parsing: remove whitespace
        const allMoves = puzzle.moves.trim().split(/\s+/);
        const opponentMove = allMoves[0];

        // Safety check: if puzzle has no moves
        if (!opponentMove || opponentMove.length < 4) {
            console.error("Puzzle has invalid moves data:", puzzle.moves);
            setStatus('error');
            setErrorMsg('Error: Datos de movimientos inválidos.');
            return;
        }

        const opponentFrom = opponentMove.substring(0, 2);
        const opponentTo = opponentMove.substring(2, 4);

        // Determine User Side (Opposite of first mover in FEN)
        const fenParts = puzzle.fen.split(' ');
        const firstMover = fenParts[1];
        const userSide = firstMover === 'w' ? 'black' : 'white';
        setUserTurn(userSide);

        // 2. Configure Chessground
        const config = {
            fen: puzzle.fen,
            orientation: userSide,
            movable: {
                free: false,
                color: undefined, // LOCKED initially. User must wait for opponent move.
                dests: new Map(),
            },
            highlight: {
                lastMove: true,
                check: true
            },
            animation: {
                enabled: true,
                duration: 300
            },
            events: {
                move: (orig: string, dest: string) => {
                    // Use 'engine' from local scope, not 'chess' state which might be stale/null in closure
                    handleUserMove(orig, dest, allMoves, engine, userSide);
                }
            }
        };

        // 3. Initialize Board
        boardRef.current.innerHTML = '';
        const cg = Chessground(boardRef.current, config as any);
        apiRef.current = cg;

        // 4. Initial Opponent Move (Auto-play sequence)
        const timer = setTimeout(() => {
            try {
                // Apply move to engine (use local variable)
                engine.move({ from: opponentFrom, to: opponentTo });

                // Update Visuals
                cg.set({
                    fen: engine.fen(), // Use engine.fen()
                    lastMove: [opponentFrom, opponentTo],
                    movable: {
                        free: false,
                        color: userSide,
                        dests: toDests(engine) as any // Use toDests(engine)
                    }
                });

                playAudio('move');
                setStatus('user'); // Unlock for user
            } catch (e) {
                console.error("Error executing initial opponent move:", e);
            }
        }, 800);

        // Cleanup
        return () => {
            clearTimeout(timer);
            cg.destroy();
        };
    }, []); // Empty dependency array! We depend on 'key' from parent to re-mount.

    const handleUserMove = (orig: string, dest: string, allMoves: string[], engine: Chess, playerColor: 'white' | 'black') => {
        const currentIndex = moveProgress.current;
        const expectedMove = allMoves[currentIndex];

        // 1. Attempt move in engine
        let moveAttempt = null;
        try {
            moveAttempt = engine.move({ from: orig, to: dest, promotion: 'q' });
        } catch (e) { return; } // Illegal move caught by engine

        if (!moveAttempt) return;

        // 2. Check if it matches solution
        const playedMoveUCI = `${moveAttempt.from}${moveAttempt.to}${moveAttempt.promotion ? moveAttempt.promotion : ''}`;
        const isCorrect = playedMoveUCI === expectedMove || (playedMoveUCI.slice(0, 4) === expectedMove.slice(0, 4));

        if (isCorrect) {
            playAudio('move');
            moveProgress.current++;

            // Lock board temporarily
            apiRef.current?.set({
                fen: engine.fen(),
                check: engine.inCheck(),
                movable: { dests: new Map() }
            });

            // Check if user finished
            if (moveProgress.current >= allMoves.length) {
                setTimeout(() => {
                    setStatus('success');
                    onSuccess();
                }, 500);
            } else {
                // Opponent Response
                setTimeout(() => {
                    const responseStr = allMoves[moveProgress.current];
                    if (responseStr) {
                        const from = responseStr.substring(0, 2);
                        const to = responseStr.substring(2, 4);
                        const promo = responseStr.length > 4 ? responseStr[4] : undefined;

                        try {
                            engine.move({ from, to, promotion: promo });

                            apiRef.current?.set({
                                fen: engine.fen(),
                                lastMove: [from, to],
                                check: engine.inCheck(),
                                movable: {
                                    free: false,
                                    color: playerColor, // CRITICAL: Explicit color
                                    dests: toDests(engine)
                                }
                            });

                            playAudio('move');
                            moveProgress.current++; // Advance index for next user turn

                            // Check if puzzle ended after opponent move (unlikely but possible)
                            if (moveProgress.current >= allMoves.length) {
                                setTimeout(() => {
                                    setStatus('success');
                                    onSuccess();
                                }, 500);
                            }
                        } catch (e) {
                            console.error("Opponent move error:", e);
                        }
                    }
                }, 500);
            }
        } else {
            // Wrong Move
            setStatus('fail');
            onFail(); // Notify parent for shake effect or sound

            setTimeout(() => {
                engine.undo(); // Rollback
                apiRef.current?.set({
                    fen: engine.fen(),
                    check: engine.inCheck(),
                    movable: {
                        color: playerColor,
                        dests: toDests(engine)
                    }
                });
                setStatus('user');
            }, 500);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            {status === 'error' ? (
                <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-2">error</span>
                    <p className="text-red-700 font-bold">{errorMsg}</p>
                    <p className="text-xs text-red-500 mt-1 font-mono">{puzzle.id}</p>
                </div>
            ) : (
                <div
                    ref={boardRef}
                    className={`
                    cg-wrap
                    shadow-xl rounded-sm
                    bg-white
                    ${status === 'fail' ? 'ring-4 ring-red-400' : 'ring-8 ring-white'}
                `}
                    style={{
                        width: 'min(90vw, 85vh)',
                        height: 'min(90vw, 85vh)',
                        display: 'block'
                    }}
                ></div>
            )}
        </div>
    );
};


// --- MAIN PARENT COMPONENT ---
const LessonPage: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const topic = getLessonById(topicId || '');

    // State
    const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Initial load check
    useEffect(() => {
        if (!topic) {
            navigate('/learn');
            return;
        }
    }, [topic, navigate]);

    // Fetch Puzzles from Supabase
    useEffect(() => {
        const fetchPuzzles = async () => {
            if (!topic) return;

            setLoading(true);

            // Mapping Logic (Kept same as before)
            const themeMap: Record<string, string[]> = {
                'mate-in-1': ['mate', 'mateIn1'],
                'mate-in-2': ['mate', 'mateIn2'],
                'checkmate': ['mate'],
                'anastasia-mate': ['mate', 'anastasiaMate'],
                'arabian-mate': ['mate', 'arabianMate'],
                'back-rank': ['mate', 'backRankMate'],
                'smothered': ['mate', 'smotheredMate'],
                'bodens': ['mate', 'bodenMate'],
                'double-bishop': ['mate', 'doubleBishopMate'],
                'dovetail': ['mate', 'dovetailMate'],
                'hook': ['mate', 'hookMate']
            };
            const lengthMap: Record<string, number> = {
                'mate-in-1': 2,
                'mate-in-2': 4
            };

            let searchTags = themeMap[topic.id] || [topic.id];

            const { data, error } = await supabase
                .from('puzzles')
                .select('*')
                .contains('temas', searchTags)
                .limit(60);

            if (error) {
                console.error("Error fetching puzzles:", error);
                Swal.fire('Error', 'No se pudieron cargar los ejercicios.', 'error');
            } else if (data && data.length > 0) {
                let validPuzzles = data;
                if (lengthMap[topic.id]) {
                    const expectedLength = lengthMap[topic.id];
                    validPuzzles = data.filter(p => {
                        const movesCount = p.moves.trim().split(/\s+/).length;
                        if (movesCount !== expectedLength) {
                            console.warn(`[DEBUG] Puzzle ${p.id} filtered. Expected ${expectedLength} moves, got ${movesCount}. Moves: ${p.moves}`);
                        }
                        return movesCount === expectedLength;
                    });
                }
                // Fallback
                if (validPuzzles.length === 0) validPuzzles = data;

                if (validPuzzles.length > 0) {
                    // [MODIFIED] Removed .slice(0, 5) to allow all loaded puzzles
                    const shuffled = validPuzzles.sort(() => 0.5 - Math.random());
                    console.log(`[DEBUG] Loaded ${shuffled.length} puzzles for topic ${topic.id}`);
                    setPuzzles(shuffled);
                } else {
                    Swal.fire('Info', `No hay ejercicios válidos para "${topic.title}".`, 'info');
                }
            } else {
                Swal.fire('Info', `No encontramos ejercicios para "${topic.title}".`, 'info');
            }
            setLoading(false);
        };

        fetchPuzzles();
    }, [topic]);

    const handleSuccess = () => {
        playAudio('success');
        Swal.fire({
            toast: true, position: 'top', icon: 'success', title: '¡Correcto!',
            timer: 1000, showConfirmButton: false, background: '#ffffff',
            customClass: { popup: 'rounded-xl shadow-lg border border-slate-100' }
        });

        setTimeout(() => {
            if (currentPuzzleIndex < puzzles.length - 1) {
                setCurrentPuzzleIndex(prev => prev + 1);
            } else {
                handleLessonComplete();
            }
        }, 1200);
    };

    const handleFail = () => {
        playAudio('failure');
    };

    const handleLessonComplete = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && topic) {
            await supabase
                .from('user_progress')
                .upsert({
                    user_id: user.id,
                    lesson_id: topic.id,
                    status: 'completed',
                    updated_at: new Date().toISOString()
                });
        }
        Swal.fire({
            title: '¡Lección Completada!',
            html: `
                <div class="flex flex-col items-center">
                    <span class="material-symbols-outlined text-6xl text-yellow-400 mb-2">emoji_events</span>
                    <p class="text-gray-600 mt-2">Has desbloqueado el siguiente nivel.</p>
                </div>
            `,
            confirmButtonText: 'Volver al Mapa',
            confirmButtonColor: '#3080e3',
            background: '#fff',
            customClass: { popup: 'rounded-2xl shadow-xl font-body' }
        }).then(() => navigate('/learn'));
    };

    if (!topic) return null;

    return (
        <div className="w-full h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden font-body text-slate-800">
            {/* 1. Main Content Area (Board) */}
            <div className="flex-1 order-1 md:order-2 flex items-center justify-center p-2 md:p-0 relative bg-slate-100">
                {/* ACTIVE PUZZLE RENDERING - THE KEY IS THE MAGIC */}
                {!loading && puzzles[currentPuzzleIndex] ? (
                    <ActivePuzzle
                        key={puzzles[currentPuzzleIndex].id} // FORCE REMOUNT ON INDEX CHANGE
                        puzzle={puzzles[currentPuzzleIndex]}
                        onSuccess={handleSuccess}
                        onFail={handleFail}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary-island border-t-transparent rounded-full animate-spin"></div>
                        <span className="font-bold text-slate-500">
                            {loading ? 'Cargando tablero...' : 'Preparando ejercicios...'}
                        </span>
                    </div>
                )}
            </div>

            {/* 2. Sidebar (Info) */}
            <div className="w-full md:w-[350px] lg:w-[400px] h-[35vh] md:h-full order-2 md:order-1 bg-white flex flex-col border-t md:border-t-0 md:border-r border-slate-200 relative z-20 shadow-lg">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <button onClick={() => navigate('/learn')} className="text-slate-400 hover:text-primary-island transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-primary-island uppercase tracking-wider">Práctica</span>
                        <h2 className="text-sm font-bold text-slate-800">{topic.title}</h2>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Mission Card */}
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div>
                            <h3 className="text-blue-900 font-bold text-sm mb-1">Tu Misión</h3>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                Juegas para ganar. <br />
                                <span className="opacity-80 text-xs mt-1 block font-medium">{topic.description}</span>
                            </p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between text-xs font-bold mb-3 uppercase text-slate-400">
                            <span>Progreso</span>
                            <span className="text-slate-600">{currentPuzzleIndex + 1} / {puzzles.length || 5}</span>
                        </div>
                        <div className="flex gap-2.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${i < currentPuzzleIndex ? 'bg-green-500' :
                                        i === currentPuzzleIndex ? 'bg-blue-500 scale-110 shadow-blue-200 shadow-lg' : 'bg-slate-200'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <button onClick={() => navigate('/learn')} className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-red-500 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm uppercase tracking-wide">
                        <span className="material-symbols-outlined text-lg">flag</span>
                        Rendirse
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonPage;
