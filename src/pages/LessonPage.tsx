import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chessground } from 'chessground';
import { getLessonById } from '../data/lessons';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';
import '../index.css';

// Interface for our Supabase puzzle
interface Puzzle {
    id: string;
    fen: string;
    moves: string;
    rating: number;
    temas: string[];
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
    const [userTurn, setUserTurn] = useState<'white' | 'black'>('white');
    const [status, setStatus] = useState<'agent' | 'user' | 'success' | 'fail'>('agent'); // agent = auto playing first move

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

            // Map topic to search terms (Lichess themes)
            let searchTag = topic.id;

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

            if (themeMap[topic.id]) {
                searchTag = themeMap[topic.id];
            }

            const { data, error } = await supabase
                .from('puzzles')
                .select('*')
                .contains('temas', [searchTag])
                .limit(20);

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

    // Sounds
    const playSound = (type: 'move' | 'capture' | 'success') => {
        // Simplified sounds using browser oscillation or placeholder URLs.
        // Usually we would need local assets. For now, we'll try to use a reliable CDN or silent fallback if not available.
        // Let's assume standard Lichess sounds or similar if we can linked them. 
        // Or leave empty for now to avoid 404s, just visualizing.
        // NOTE: Sound implementation requires assets.
    };

    // Handle board logic
    useEffect(() => {
        if (boardRef.current && puzzles.length > 0 && !loading) {
            const puzzle = puzzles[currentPuzzleIndex];
            if (!puzzle) return;

            // Logic:
            // 1. Parsing moves: "e2e4 c7c5 ..."
            // 2. First move is OPPONENT. We play it automatically.
            // 3. Second move is USER. 
            // 4. Determines orientation.

            const allMoves = puzzle.moves.split(' ');
            const opponentMove = allMoves[0]; // Start move
            const opponentFrom = opponentMove.substring(0, 2);
            const opponentTo = opponentMove.substring(2, 4);

            // Determine side based on Turn in FEN
            // FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            // If 'w', it is White's turn to make the FIRST move (opponent).
            // So User is BLACK.
            const fenParts = puzzle.fen.split(' ');
            const firstMover = fenParts[1]; // 'w' or 'b'
            const userSide = firstMover === 'w' ? 'black' : 'white';

            setUserTurn(userSide);

            // Configure Board
            const config = {
                fen: puzzle.fen,
                orientation: userSide,
                movable: {
                    free: false,
                    color: userSide,
                    dests: new Map(), // We will allow free movement as we don't have chess.js engine loaded yet
                    showDests: false, // Don't show confusing dots if we don't calculate them
                },
                highlight: {
                    lastMove: true,
                    check: true
                },
                animation: {
                    enabled: true,
                    duration: 500
                },
                events: {
                    move: (orig: string, dest: string) => {
                        handleUserMove(orig, dest, allMoves);
                    }
                }
            };

            // Reset board container
            if (boardRef.current) boardRef.current.innerHTML = '';

            // Initialize
            const chessgroundApi = Chessground(boardRef.current, config as any);
            setApi(chessgroundApi);

            // Allow free movement because we don't have chess.js to calculate legal moves
            // But we restrict 'color' to userSide so they can only pick up their pieces.
            chessgroundApi.set({
                movable: {
                    free: true,
                    color: userSide
                }
            });

            // TIMING: Auto-play the opponent's first move
            // We delay slightly to let the board render the start position, then BAM, move happens.
            setTimeout(() => {
                chessgroundApi.move(opponentFrom, opponentTo);
                playSound('move');
                setStatus('user'); // Now it's user's turn
            }, 800);

            return () => {
                chessgroundApi.destroy();
            }
        }
    }, [puzzles, currentPuzzleIndex, loading]);

    // We need a ref to track current move index across the closure of the event handler
    // OR just use the index relative to the moves array.
    // Since we re-create the board on index change, we can just use local vars inside the effect
    // BUT 'handleUserMove' needs to be stable or closure-aware. 
    // Actually, separating it is cleaner but we need access to 'api'.

    // Let's simply handle logic inside the move handler in the effect for simplicity of closure,
    // OR use a mutable ref for move progress.
    const moveProgress = useRef(1); // Start at 1 because 0 was opponent's move

    // Reset progress when puzzle changes
    useEffect(() => {
        moveProgress.current = 1;
    }, [currentPuzzleIndex]);

    const handleUserMove = (orig: string, dest: string, allMoves: string[]) => {
        // Current expected move index
        const currentIndex = moveProgress.current;
        const expectedMove = allMoves[currentIndex]; // This is the user's correct move

        const playedMove = `${orig}${dest}`;

        // Simple check (ignores promotions q, r, b, n suffix usually in simple notation it matches, 
        // but Lichess strings are 'a7a8q'. Chessground might trigger 'a7a8'. 
        // We might need to handle promotion detection. For Mates, usually queens.
        // We'll assume strict match or simple 'includes'.

        if (playedMove === expectedMove || expectedMove.startsWith(playedMove)) {
            // CORRECT MOVE
            playSound('move');
            moveProgress.current++; // User move done

            // Check if puzzle ended (was that the last needed move?)
            // Usually puzzles have a sequence.
            if (moveProgress.current >= allMoves.length) {
                setTimeout(handleSuccess, 500);
            } else {
                // Opponent Response
                setTimeout(() => {
                    const responseMove = allMoves[moveProgress.current];
                    if (responseMove) {
                        const from = responseMove.substring(0, 2);
                        const to = responseMove.substring(2, 4);
                        api?.move(from, to);
                        playSound('move');
                        moveProgress.current++;

                        // Check if puzzle ended after opponent move
                        if (moveProgress.current >= allMoves.length) {
                            setTimeout(handleSuccess, 500);
                        }
                    }
                }, 500);
            }
        } else {
            // WRONG MOVE
            // console.log("Wrong move", playedMove, "expected", expectedMove);
            // Snap back / Undo
            setStatus('fail');
            setTimeout(() => {
                // Since we don't have full undo, we force the board back to the state before the user move.
                // The easiest way without chess.js history is to just re-render/reload the puzzle state or ask user to fix.
                // But visually the piece moved.
                // Chessground allows 'undo' if we tracked it? No.
                // We will just alert and user has to move it back manually or we reset logic?
                // Better: Trigger a "Takeback" visually by playing the move reverse?
                api?.move(dest, orig); // Move piece back!
                setStatus('user');
            }, 400);
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
            backdrop: `rgba(0,0,0,0.4)`
        });

        if (currentPuzzleIndex < puzzles.length - 1) {
            setCurrentPuzzleIndex(prev => prev + 1);
        } else {
            handleLessonComplete();
        }
    };

    const handleLessonComplete = async () => {
        // Save progress to Supabase
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
                    <p>Has desbloqueado el siguiente nivel.</p>
                </div>
            `,
            confirmButtonText: 'Volver al Mapa',
            confirmButtonColor: '#3080e3',
            background: '#fff',
            customClass: {
                popup: 'rounded-2xl shadow-xl'
            }
        }).then(() => {
            navigate('/learn');
        });
    };

    if (!topic) return null;

    return (
        <div className="w-full h-screen bg-slate-900 flex flex-col md:flex-row overflow-hidden relative">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

            {/* Sidebar / Instructions */}
            <div className="w-full md:w-[400px] bg-slate-800 border-r border-slate-700 flex flex-col relative z-10 shadow-2xl">

                {/* Header */}
                <div className="p-6 border-b border-slate-700">
                    <button onClick={() => navigate('/learn')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group">
                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="font-bold">Volver al mapa</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary-island flex items-center justify-center text-white shadow-lg">
                            <span className="material-symbols-outlined text-2xl">{topic.icon}</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white leading-tight">{topic.title}</h2>
                            <span className="text-xs font-bold text-primary-island uppercase tracking-wider">Lección Práctica</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600 mb-6">
                        <h3 className="text-primary-light font-bold mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">info</span>
                            Misión
                        </h3>
                        <p className="text-slate-200">
                            {topic.description} Encuentra la mejor jugada para {userTurn === 'white' ? 'las Blancas' : 'las Negras'}.
                        </p>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase">Progreso</span>
                        <span className="text-xs font-bold text-white">{currentPuzzleIndex + 1} / {puzzles.length || 5}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3 mb-6 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-primary-island to-blue-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{ width: `${((currentPuzzleIndex) / (puzzles.length || 5)) * 100}%` }}
                        ></div>
                    </div>

                    {status === 'fail' && (
                        <div className="animate-bounce bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3">
                            <span className="material-symbols-outlined">error</span>
                            <span className="font-bold text-sm">¡Movimiento incorrecto! Intenta de nuevo.</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-700 bg-slate-800/50">
                    <button
                        onClick={() => navigate('/learn')}
                        className="w-full text-slate-500 hover:text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 hover:bg-slate-700">
                        <span className="material-symbols-outlined">flag</span>
                        Rendirse
                    </button>
                </div>
            </div>

            {/* Board Area */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-10 relative bg-gradient-to-br from-slate-900 to-slate-800">
                <div className={`
                    w-full max-w-[70vh] aspect-square rounded-lg shadow-2xl overflow-hidden border-[12px] border-slate-700
                    ${status === 'fail' ? 'ring-4 ring-red-500 ring-opacity-50' : 'ring-4 ring-black/20'}
                    transition-all duration-300
                `} ref={boardRef}>
                    {loading && (
                        <div className="absolute inset-0 bg-slate-900/90 z-50 flex items-center justify-center text-white flex-col gap-4">
                            <div className="w-16 h-16 border-4 border-primary-island border-t-transparent rounded-full animate-spin"></div>
                            <p className="font-bold animate-pulse">Preparando tablero...</p>
                        </div>
                    )}
                </div>

                {/* Turn Indicator Pill */}
                {!loading && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur border border-slate-600 px-6 py-2 rounded-full shadow-xl flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${userTurn === 'white' ? 'bg-white' : 'bg-black border border-slate-500'}`}></div>
                        <span className="text-white font-bold text-sm">
                            Te toca mover ({userTurn === 'white' ? 'Blancas' : 'Negras'})
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonPage;
