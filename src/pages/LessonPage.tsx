import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chessground } from 'chessground';
import { getLessonById } from '../data/lessons';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';
import '../index.css';
// Import Chessground CORE styles (Essential for pieces to show up!)
import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css'; // Theme
import 'chessground/assets/chessground.cburnett.css'; // Piece set

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

            // Map topic to search terms (Lichess themes)
            let searchTag = topic.id;
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

    // Simple Sound Effects
    const playSound = (type: 'move' | 'capture' | 'success') => {
        // Placeholder for real sound implementation
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
                    dests: undefined, // Let valid moves be handled by logic or show all (free: true below)
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
                        handleUserMove(orig, dest, allMoves);
                    }
                }
            };

            if (boardRef.current) boardRef.current.innerHTML = '';

            const chessgroundApi = Chessground(boardRef.current, config as any);
            setApi(chessgroundApi);

            chessgroundApi.set({
                movable: {
                    free: true,
                    color: userSide
                }
            });

            setTimeout(() => {
                chessgroundApi.move(opponentFrom, opponentTo);
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

    const handleUserMove = (orig: string, dest: string, allMoves: string[]) => {
        const currentIndex = moveProgress.current;
        const expectedMove = allMoves[currentIndex];
        const playedMove = `${orig}${dest}`;

        if (playedMove === expectedMove || expectedMove.startsWith(playedMove)) {
            playSound('move');
            moveProgress.current++;

            if (moveProgress.current >= allMoves.length) {
                setTimeout(handleSuccess, 500);
            } else {
                setTimeout(() => {
                    const responseMove = allMoves[moveProgress.current];
                    if (responseMove) {
                        const from = responseMove.substring(0, 2);
                        const to = responseMove.substring(2, 4);
                        api?.move(from, to);
                        playSound('move');
                        moveProgress.current++;

                        if (moveProgress.current >= allMoves.length) {
                            setTimeout(handleSuccess, 500);
                        }
                    }
                }, 500);
            }
        } else {
            setStatus('fail');
            setTimeout(() => {
                api?.move(dest, orig); // Visual Undo
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
        <div className="w-full h-screen bg-[#161512] flex flex-col md:flex-row overflow-hidden font-body text-[#bababa]">

            {/* 1. Main Content Area (Board) - Order 1 on Mobile (Top) */}
            <div className="flex-1 order-1 md:order-2 flex items-center justify-center p-2 md:p-0 relative bg-[#262421]">
                {/* Board Container: constrained aspect ratio */}
                <div className="w-full h-full flex items-center justify-center">
                    <div
                        ref={boardRef}
                        className={`
                            cg-wrap
                            shadow-2xl rounded-sm
                            ${status === 'fail' ? 'ring-4 ring-red-500/50' : ''}
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
                            <div className="absolute inset-0 bg-slate-900/90 z-50 flex items-center justify-center text-white flex-col gap-4 rounded-sm">
                                <div className="w-12 h-12 border-4 border-primary-island border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile: Turn Indicator Overlay (Bottom of board) */}
                {!loading && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden pointer-events-none">
                        <div className="bg-black/60 backdrop-blur px-4 py-1 rounded-full text-white text-xs font-bold border border-white/10 shadow-lg">
                            {userTurn === 'white' ? 'Juegan Blancas' : 'Juegan Negras'}
                        </div>
                    </div>
                )}
            </div>

            {/* 2. Sidebar (Info) - Order 2 on Mobile (Bottom) */}
            <div className="w-full md:w-[350px] lg:w-[400px] h-[35vh] md:h-full order-2 md:order-1 bg-[#161512] flex flex-col border-t md:border-t-0 md:border-r border-[#302e2c] relative z-20">

                {/* Header */}
                <div className="p-4 border-b border-[#302e2c] flex items-center justify-between">
                    <button onClick={() => navigate('/learn')} className="text-[#bababa] hover:text-white transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-[#629924] uppercase tracking-wider">Práctica</span>
                        <h2 className="text-sm font-bold text-white">{topic.title}</h2>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Mission Card */}
                    <div className="bg-[#262421] p-4 rounded-lg border-l-4 border-[#629924]">
                        <h3 className="text-white font-bold mb-1 flex items-center gap-2 text-sm">
                            <span className="material-symbols-outlined text-[#629924] text-lg">flag</span>
                            Tu Misión
                        </h3>
                        <p className="text-sm text-[#bababa]">
                            {userTurn === 'white' ? 'Las Blancas' : 'Las Negras'} juegan y ganan.
                            <br />
                            <span className="opacity-70 text-xs mt-1 block">{topic.description}</span>
                        </p>
                    </div>

                    {/* Progress */}
                    <div>
                        <div className="flex justify-between text-xs font-bold mb-2 uppercase text-[#666]">
                            <span>Progreso</span>
                            <span>{currentPuzzleIndex + 1} / {puzzles.length || 5}</span>
                        </div>
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 flex-1 rounded-sm transition-colors ${i < currentPuzzleIndex ? 'bg-[#629924]' :
                                            i === currentPuzzleIndex ? 'bg-white animate-pulse' : 'bg-[#302e2c]'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-[#302e2c] bg-[#201e1b]">
                    <button
                        onClick={() => navigate('/learn')}
                        className="w-full bg-[#302e2c] hover:bg-[#3e3c38] text-[#bababa] hover:text-white py-3 rounded text-sm font-bold transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">flag</span>
                        Rendirse y Salir
                    </button>
                </div>
            </div>

        </div>
    );
};

export default LessonPage;
