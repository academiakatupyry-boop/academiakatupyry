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

            // Attempt to fetch random puzzles containing the tag.
            // Since user uploaded 7 per route, we fetch up to 20 to catch them all and shuffle.
            const { data, error } = await supabase
                .from('puzzles')
                .select('*')
                .contains('temas', [searchTag])
                .limit(20);

            if (error) {
                console.error("Error fetching puzzles:", error);
                Swal.fire('Error', 'No se pudieron cargar los ejercicios. Verifica tu conexión.', 'error');
            } else if (data && data.length > 0) {
                // Simple client-side shuffle
                const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 5);
                setPuzzles(shuffled);
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Sin Ejercicios',
                    text: `No encontramos ejercicios para "${topic.title}" (tag: ${searchTag}). Verifique la base de datos.`,
                });
            }
            setLoading(false);
        };

        fetchPuzzles();
    }, [topic]);

    // Handle board logic
    useEffect(() => {
        if (boardRef.current && puzzles.length > 0 && !loading) {
            const puzzle = puzzles[currentPuzzleIndex];
            if (!puzzle) return;

            const solutionMoves = puzzle.moves.split(' ');
            let moveIndex = 0;

            const config = {
                fen: puzzle.fen,
                orientation: 'white',
                movable: {
                    free: false,
                    color: 'white',
                    dests: new Map(),
                },
                events: {
                    move: (orig: string, dest: string) => {
                        const playedMove = `${orig}${dest}`;
                        const expectedMove = solutionMoves[moveIndex];

                        if (playedMove === expectedMove) {
                            // Correct move
                            moveIndex++;

                            // Check if puzzle ended (user just moved)
                            if (moveIndex >= solutionMoves.length) {
                                handleSuccess();
                            } else {
                                // Opponent response (auto play)
                                setTimeout(() => {
                                    const responseMove = solutionMoves[moveIndex];
                                    if (responseMove) {
                                        const from = responseMove.substring(0, 2);
                                        const to = responseMove.substring(2, 4);
                                        api?.move(from, to);
                                        moveIndex++;

                                        // Check if puzzle ended after opponent move
                                        if (moveIndex >= solutionMoves.length) {
                                            handleSuccess();
                                        }
                                    }
                                }, 500);
                            }
                        } else {
                            // Incorrect move
                            Swal.fire({
                                icon: 'error',
                                title: 'Incorrecto',
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 1000
                            });
                            // Undo visually by reloading FEN after a delay
                            setTimeout(() => {
                                // Since we don't have undo fn, we might need to re-init or use set
                                // api?.set({ fen: puzzle.fen }); // This would reset to start
                            }, 500);
                        }
                    }
                }
            };

            // Fix Color/Orientation based on FEN (who moves next)
            const turnColor = puzzle.fen.split(' ')[1] === 'w' ? 'white' : 'black';
            // @ts-ignore
            config.orientation = turnColor;
            // @ts-ignore
            config.movable.color = turnColor;
            // @ts-ignore
            config.movable.free = true; // Allow free movement since we lack validation engine

            if (boardRef.current) boardRef.current.innerHTML = '';

            const chessgroundApi = Chessground(boardRef.current, config);
            setApi(chessgroundApi);

            return () => {
                chessgroundApi.destroy();
            }
        }
    }, [puzzles, currentPuzzleIndex, loading]);

    const handleSuccess = async () => {
        await Swal.fire({
            icon: 'success',
            title: '¡Excelente!',
            text: 'Ejercicio completado.',
            timer: 1500,
            showConfirmButton: false
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
            text: 'Has desbloqueado el siguiente nivel.',
            icon: 'success',
            confirmButtonText: 'Volver al Mapa',
            confirmButtonColor: '#3080e3'
        }).then(() => {
            navigate('/learn');
        });
    };

    if (!topic) return null;

    return (
        <div className="text-slate-800 pt-24 pb-12 font-body flex flex-col md:flex-row h-screen">
            {/* Sidebar / Instructions */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white/5 border-r border-white/10 p-6 flex flex-col">
                <button onClick={() => navigate('/learn')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver
                </button>

                <div className="flex items-center gap-3 mb-4 text-primary-island">
                    <span className="material-symbols-outlined text-3xl">{topic.icon}</span>
                    <h2 className="text-2xl font-black font-display text-white">{topic.title}</h2>
                </div>

                <p className="text-gray-400 text-sm mb-6 border-b border-white/10 pb-4">
                    {topic.description}
                </p>

                <div className="bg-primary-island/10 border border-primary-island/30 rounded-xl p-4 mb-auto">
                    <h3 className="font-bold text-primary-light mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined">lightbulb</span>
                        Instrucción
                    </h3>
                    <p className="text-white text-lg">
                        {loading
                            ? 'Buscando ejercicios...'
                            : puzzles.length > 0
                                ? `Juegan ${puzzles[currentPuzzleIndex].fen.includes(' w ') ? 'Blancas' : 'Negras'} y ganan.`
                                : 'No se encontraron ejercicios.'}
                    </p>
                </div>

                {/* Progress / Navigation */}
                <div className="mt-6">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>Ejercicio {currentPuzzleIndex + 1} de {puzzles.length || 5}</span>
                        <span>{Math.round(((currentPuzzleIndex) / (puzzles.length || 5)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                        <div
                            className="bg-primary-island h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((currentPuzzleIndex) / (puzzles.length || 5)) * 100}%` }}
                        ></div>
                    </div>

                    <button
                        onClick={() => navigate('/learn')}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-colors mb-2">
                        Abandonar Lección
                    </button>
                </div>
            </div>

            {/* Board Area */}
            <div className="flex-1 flex items-center justify-center bg-black/20 relative p-4">
                {/* Decorative Background */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="w-full max-w-[600px] aspect-square shadow-board rounded-lg overflow-hidden border-8 border-white/10 relative z-10" ref={boardRef}>
                    {loading && (
                        <div className="absolute inset-0 bg-slate-900/80 z-50 flex items-center justify-center text-white flex-col gap-4">
                            <span className="material-symbols-outlined text-4xl animate-spin">autorenew</span>
                            <p>Cargando ejercicios...</p>
                        </div>
                    )}
                    {/* Chessground mounts here */}
                </div>
            </div>
        </div>
    );
};

export default LessonPage;
