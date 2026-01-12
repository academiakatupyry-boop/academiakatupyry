import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chessground } from 'chessground';
import { Chess, Move } from 'chess.js'; // Import Chess Engine
import { getLessonById } from '../data/lessons';
import { supabase } from '../lib/supabase';
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

const LessonPage: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const topic = getLessonById(topicId || '');

    // State
    const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [api, setApi] = useState<any>(null);
    const [chess, setChess] = useState<Chess>(new Chess()); // Chess Engine Instance
    const [userTurn, setUserTurn] = useState<'white' | 'black'>('white');
    const [status, setStatus] = useState<'agent' | 'user' | 'success' | 'fail'>('agent');

    const boardRef = useRef<HTMLDivElement>(null);

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

            // Comprehensive mapping
            const themeMap: Record<string, string> = {
                'mate-in-1': 'mateIn1',
                'mate-in-2': 'mateIn2',
                'checkmate': 'mate',
                'anastasia-mate': 'anastasiaMate',
                'arabian-mate': 'arabianMate',
                'back-rank': 'backRankMate',
                'smothered': 'smotheredMate',
                'bodens': 'bodenMate',
                'double-bishop': 'doubleBishopMate',
                'dovetail': 'dovetailMate',
                'hook': 'hookMate'
            };

            let searchTag = themeMap[topic.id] || topic.id;
            console.log(`[PuzzleFetch] Searching for tag: ${searchTag}`);

            const { data, error } = await supabase
                .from('puzzles')
                .select('*')
                .contains('temas', [searchTag])
                .limit(30);

            if (error) {
                console.error("Error fetching puzzles:", error);
                Swal.fire('Error', 'No se pudieron cargar los ejercicios. Verifica tu conexión.', 'error');
            } else if (data && data.length > 0) {
                const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 5);
                setPuzzles(shuffled);
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Sin Ejercicios',
                    text: `No encontramos ejercicios para "${topic.title}" (tag: ${searchTag}).`,
                });
            }
            setLoading(false);
        };

        fetchPuzzles();
    }, [topic]);

    // Simple Sound Effects
    const playSound = (type: 'move' | 'capture' | 'success') => {
        // Placeholder
    };

    // Handle board logic
    useEffect(() => {
        if (boardRef.current && puzzles.length > 0 && !loading) {
            const puzzle = puzzles[currentPuzzleIndex];
            if (!puzzle) return;

            const allMoves = puzzle.moves.split(' ');
            const opponentMove = allMoves[0];
            const opponentFrom = opponentMove.substring(0, 2);
            const opponentTo = opponentMove.substring(2, 4);

            // Initialize Chess Engine with FEN
            const newChess = new Chess(puzzle.fen);
            setChess(newChess);

            const fenParts = puzzle.fen.split(' ');
            const firstMover = fenParts[1];
            const userSide = firstMover === 'w' ? 'black' : 'white';

            setUserTurn(userSide);

            const config = {
                fen: puzzle.fen,
                orientation: userSide,
                movable: {
                    free: false,
                    color: userSide,
                    dests: toDests(newChess), // Use chess.js legal moves!
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
                        handleUserMove(orig, dest, allMoves, newChess); // Pass engine instance
                    }
                }
            };

            if (boardRef.current) boardRef.current.innerHTML = '';

            const chessgroundApi = Chessground(boardRef.current, config as any);
            setApi(chessgroundApi);

            // Initial Opponent Move (Auto-play)
            setTimeout(() => {
                // Update engine state
                try {
                    newChess.move({ from: opponentFrom, to: opponentTo });
                } catch (e) { console.error("Opponent move invalid in engine", e); }

                // Update board visual
                chessgroundApi.set({
                    fen: newChess.fen(),
                    movable: {
                        free: false,
                        color: userSide,
                        dests: toDests(newChess) // Update legal moves for USER response
                    }
                });

                playSound('move');
                setStatus('user');
            }, 800);

            return () => {
                chessgroundApi.destroy();
            }
        }
    }, [puzzles, currentPuzzleIndex, loading]);

    // Move Tracking
    const moveProgress = useRef(1);
    useEffect(() => {
        moveProgress.current = 1;
    }, [currentPuzzleIndex]);

    const handleUserMove = (orig: string, dest: string, allMoves: string[], engine: Chess) => {
        const currentIndex = moveProgress.current;
        const expectedMove = allMoves[currentIndex];

        // 1. Attempt move in engine (Rules of Chess check)
        // We detect promotion automatically to Queen for simplicity in puzzles usually
        let moveAttempt = null;
        try {
            moveAttempt = engine.move({ from: orig, to: dest, promotion: 'q' });
        } catch (e) {
            // Illegal move (shouldn't happen with dests, but safe guard)
            // api.set({ fen: engine.fen() }); // Snap back
            return;
        }

        if (!moveAttempt) return; // Logic failed

        const playedMoveUCI = `${moveAttempt.from}${moveAttempt.to}${moveAttempt.promotion ? moveAttempt.promotion : ''}`;

        // 2. Validate against Puzzle Solution
        // We compare the UCI strings (engine normalized matches puzzle UCI usually)
        // Puzzle UCI might be 'e7e8q', engine might give 'e7e8q'.

        // We ignore promotion char if puzzle doesn't have it, but for mates it matters.
        // Let's use flexible startsWith to allow 'a7a8' == 'a7a8q' loose matching if needed,
        // BUT for strict puzzles, exact is better. Lichess moves are exact.

        // If played move matches expected OR expected starts with played (e.g. without promo char? unlikely)
        const isCorrectParams = playedMoveUCI === expectedMove || (playedMoveUCI.slice(0, 4) === expectedMove.slice(0, 4));

        if (isCorrectParams) {
            playSound('move');
            moveProgress.current++;

            // Visual update
            api.set({
                fen: engine.fen(),
                check: engine.inCheck(),
                movable: { dests: new Map() } // Lock board while opponent thinks
            });

            if (moveProgress.current >= allMoves.length) {
                setTimeout(handleSuccess, 500);
            } else {
                // Opponent Response
                setTimeout(() => {
                    const responseMoveStr = allMoves[moveProgress.current];
                    if (responseMoveStr) {
                        const from = responseMoveStr.substring(0, 2);
                        const to = responseMoveStr.substring(2, 4);
                        const promo = responseMoveStr.length > 4 ? responseMoveStr[4] : undefined;

                        engine.move({ from, to, promotion: promo });

                        api.set({
                            fen: engine.fen(),
                            lastMove: [from, to],
                            check: engine.inCheck(),
                            movable: {
                                free: false,
                                color: userTurn,
                                dests: toDests(engine) // Unlock for next user move
                            }
                        });

                        playSound('move');
                        moveProgress.current++;

                        if (moveProgress.current >= allMoves.length) {
                            setTimeout(handleSuccess, 500);
                        }
                    }
                }, 500);
            }
        } else {
            // WRONG MOVE but legal in chess
            setStatus('fail');
            setTimeout(() => {
                engine.undo(); // Revert engine state
                api.set({
                    fen: engine.fen(), // Snap visual back
                    check: engine.inCheck(),
                    movable: {
                        color: userTurn,
                        dests: toDests(engine)
                    }
                });
                setStatus('user');
            }, 500);
        }
    };

    const handleSuccess = async () => {
        playSound('success');
        await Swal.fire({
            icon: 'success',
            title: '¡Correcto!',
            text: 'Has encontrado el movimiento ganador.',
            timer: 1500,
            showConfirmButton: false,
            backdrop: `rgba(0,0,0,0.2)`
        });

        if (currentPuzzleIndex < puzzles.length - 1) {
            setCurrentPuzzleIndex(prev => prev + 1);
        } else {
            handleLessonComplete();
        }
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
            customClass: {
                popup: 'rounded-2xl shadow-xl font-body'
            }
        }).then(() => {
            navigate('/learn');
        });
    };

    if (!topic) return null;

    return (
        <div className="w-full h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden font-body text-slate-800">

            {/* 1. Main Content Area (Board) - Order 1 on Mobile (Top) */}
            <div className="flex-1 order-1 md:order-2 flex items-center justify-center p-2 md:p-0 relative bg-slate-100">
                {/* Board Container: constrained aspect ratio */}
                <div className="w-full h-full flex items-center justify-center">
                    <div
                        ref={boardRef}
                        className={`
                            cg-wrap
                            shadow-xl rounded-sm
                            bg-white 
                            ${status === 'fail' ? 'ring-4 ring-red-400' : 'ring-8 ring-white'}
                        `}
                        // Essential: This forces the board to respect standard logical sizing 
                        // and Lichess-like responsiveness.
                        style={{
                            width: 'min(90vw, 85vh)',
                            height: 'min(90vw, 85vh)',
                            display: 'block'
                        }}
                    >
                        {/* Loading Overlay */}
                        {loading && (
                            <div className="absolute inset-0 bg-slate-50/90 z-50 flex items-center justify-center text-primary-island flex-col gap-4 rounded-sm">
                                <div className="w-12 h-12 border-4 border-primary-island border-t-transparent rounded-full animate-spin"></div>
                                <span className="font-bold">Cargando tablero...</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile: Turn Indicator Overlay (Bottom of board) */}
                {!loading && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden pointer-events-none">
                        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-slate-800 text-xs font-bold border border-slate-200 shadow-lg flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${userTurn === 'white' ? 'bg-white border-2 border-slate-800' : 'bg-slate-800 border-slate-800'}`}></div>
                            {userTurn === 'white' ? 'Juegan Blancas' : 'Juegan Negras'}
                        </div>
                    </div>
                )}
            </div>

            {/* 2. Sidebar (Info) - Order 2 on Mobile (Bottom) */}
            <div className="w-full md:w-[350px] lg:w-[400px] h-[35vh] md:h-full order-2 md:order-1 bg-white flex flex-col border-t md:border-t-0 md:border-r border-slate-200 relative z-20 shadow-lg">

                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <button onClick={() => navigate('/learn')} className="text-slate-400 hover:text-primary-island transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-primary-island uppercase tracking-wider">Práctica</span>
                        <h2 className="text-sm font-bold text-slate-800">{topic.title}</h2>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Mission Card */}
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div>
                            <h3 className="text-blue-900 font-bold text-sm mb-1">
                                Tu Misión
                            </h3>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                {userTurn === 'white' ? 'Las Blancas' : 'Las Negras'} buscan la victoria.
                                <br />
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

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <button
                        onClick={() => navigate('/learn')}
                        className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-red-500 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <span className="material-symbols-outlined text-lg">flag</span>
                        Rendirse
                    </button>
                    {/* Turn Indicator Desktop */}
                    <div className="mt-4 flex justify-center md:flex hidden">
                        <div className="bg-white px-6 py-2 rounded-full text-slate-800 text-sm font-bold border border-slate-200 shadow-sm flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${userTurn === 'white' ? 'bg-white border-slate-800' : 'bg-slate-800 border-slate-800'}`}></div>
                            {userTurn === 'white' ? 'Juegan Blancas' : 'Juegan Negras'}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LessonPage;
