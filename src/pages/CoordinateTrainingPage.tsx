import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Chessground } from 'chessground';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

// Utility to pick a random square
const getRandomSquare = (prevSquare?: string) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
    let newSquare;
    do {
        const f = files[Math.floor(Math.random() * files.length)];
        const r = ranks[Math.floor(Math.random() * ranks.length)];
        newSquare = f + r;
    } while (newSquare === prevSquare);
    return newSquare;
};

const CoordinateTrainingPage: React.FC = () => {
    const navigate = useNavigate();
    const boardRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<any>(null);
    const [targetSquare, setTargetSquare] = useState<string>(getRandomSquare());
    const [score, setScore] = useState(0);
    const [orientation, setOrientation] = useState<'white' | 'black'>('white');
    const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');

    // Init Board
    useEffect(() => {
        if (boardRef.current && !api) {
            const config = {
                fen: '8/8/8/8/8/8/8/8 w - - 0 1', // Empty board
                orientation: orientation,
                coordinates: false, // Using custom coordinates
                turnColor: 'white',
                movable: {
                    free: false,
                    color: 'white',
                },
                selectable: {
                    enabled: true // Enable selection to detect clicks
                },
                drawable: {
                    enabled: true,
                    visible: true
                },
                events: {
                    select: (key: string) => {
                        handleSquareClick(key);
                    }
                }
            };
            const cg = Chessground(boardRef.current, config);
            setApi(cg);
        }
    }, [api]);

    // Effect to update the select handler when target changes
    const targetRef = useRef(targetSquare);
    useEffect(() => { targetRef.current = targetSquare; }, [targetSquare]);

    useEffect(() => {
        if (api) {
            api.set({
                events: {
                    select: (key: string) => {
                        handleSquareClick(key);
                        // Clear selection immediately so it can be clicked again visually
                        // Using api.set({ selected: undefined }) instead of api.select(null) because api.select might not exist in this version
                        setTimeout(() => api.set({ selected: undefined }), 50);
                    }
                }
            });
        }
    }, [api]);



    // ... (inside component)

    const [isCompleted, setIsCompleted] = useState(false);

    // Save Progress Logic
    const saveProgress = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { error } = await supabase
                .from('user_progress')
                .upsert({
                    user_id: user.id,
                    lesson_id: 'coordinates',
                    status: 'completed',
                    score: score + 1 // Save final score
                }, { onConflict: 'user_id, lesson_id' });

            if (error) console.error('Error saving progress:', error);
        }
    };

    const handleSquareClick = (clickedSquare: string) => {
        const currentTarget = targetRef.current;

        if (clickedSquare === currentTarget) {
            // Correct!
            setStatus('correct');
            const newScore = score + 1;
            setScore(newScore);

            // Win Condition: 5 points
            if (newScore >= 5 && !isCompleted) {
                setIsCompleted(true);
                saveProgress();
                Swal.fire({
                    title: '¡Nivel Completado!',
                    text: 'Has dominado las coordenadas. ¡Sigue así!',
                    icon: 'success',
                    confirmButtonText: 'Continuar',
                    background: '#302e2b',
                    color: '#fff'
                }).then(() => {
                    navigate('/learn');
                });
            }

            // Draw Green Circle
            api?.setShapes([{ brush: 'green', orig: clickedSquare }]);

            setTimeout(() => {
                const next = getRandomSquare(currentTarget);
                setTargetSquare(next);
                setStatus('playing');
                api?.setShapes([]); // Clear shapes
            }, 600);
        } else {
            // ... (wrong logic same as before)
            // Wrong!
            setStatus('wrong');
            // Draw Red Circle
            api?.setShapes([{ brush: 'red', orig: clickedSquare }]);

            setTimeout(() => {
                setStatus('playing');
                api?.setShapes([]);
            }, 600);
        }
    };

    const toggleOrientation = () => {
        const newOr = orientation === 'white' ? 'black' : 'white';
        setOrientation(newOr);
        api?.set({ orientation: newOr });
    };

    return (

        <div className="flex flex-col md:flex-row items-center justify-center relative overflow-hidden font-display w-full h-screen md:h-[85vh] gap-8 md:gap-16 pt-16 md:pt-0">

            {/* Navigation (Volver only) */}
            <div className="absolute top-0 left-0 w-full p-4 z-50 pointer-events-none">
                <Link to="/fundamentals" className="pointer-events-auto text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-2 font-bold text-sm bg-white/50 px-3 py-1.5 rounded-lg backdrop-blur-sm border-2 border-slate-200">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Volver
                </Link>
            </div>

            {/* Board Area */}
            <div className="relative order-2 md:order-1">
                <div className="w-[85vw] h-[85vw] max-w-[65vh] max-h-[65vh] aspect-square rounded-md shadow-2xl overflow-hidden bg-[#ebecd0] select-none relative ring-8 ring-[#262421]">
                    <div ref={boardRef} className="w-full h-full"></div>

                    {/* Custom Coordinates Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full grid grid-cols-8 grid-rows-8">
                        {[...Array(64)].map((_, i) => {
                            const row = Math.floor(i / 8);
                            const col = i % 8;
                            const isFlipped = orientation === 'black';

                            const rank = isFlipped ? row + 1 : 8 - row;
                            const file = isFlipped ? 7 - col : col;

                            const showRank = col === 0;
                            const showFile = row === 7;
                            const isLight = (row + col) % 2 === 0;
                            const textColor = isLight ? 'text-[#60A5FA]' : 'text-white';

                            return (
                                <div key={i} className="relative w-full h-full">
                                    {showRank && <span className={`absolute top-0.5 left-1 text-[10px] md:text-sm font-bold ${textColor}`}>{rank}</span>}
                                    {showFile && <span className={`absolute bottom-0 right-1 text-[10px] md:text-sm font-bold ${textColor}`}>{String.fromCharCode(97 + file)}</span>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Sidebar Panel (Prompt & Info) */}
            <div className="flex flex-col items-center gap-6 order-1 md:order-2 md:items-start min-w-[200px]">

                {/* Score */}
                <div className="bg-white/80 px-4 py-2 rounded-xl backdrop-blur-sm text-slate-700 font-black flex items-center gap-2 border-2 border-slate-200 shadow-sm">
                    <span className="text-yellow-500 material-symbols-outlined text-2xl">star</span>
                    <span className="text-xl">Puntaje: {score}</span>
                </div>

                {/* Main Instruction / Target */}
                <div className="text-center md:text-left">
                    <h2 className="text-slate-400 text-lg font-bold uppercase tracking-widest mb-1">Encuentra</h2>
                    <div className={`text-7xl md:text-9xl font-black transition-all duration-300 transform leading-none ${status === 'correct' ? 'text-green-500 scale-110' : status === 'wrong' ? 'text-red-500 shake' : 'text-slate-800'}`}>
                        {targetSquare}
                    </div>
                </div>

                {/* Status Feedback */}
                <div className="h-8">
                    {status === 'wrong' && (
                        <span className="text-red-400 font-bold animate-pulse flex items-center gap-2">
                            <span className="material-symbols-outlined">close</span> ¡Intenta de nuevo!
                        </span>
                    )}
                    {status === 'correct' && (
                        <span className="text-green-400 font-bold animate-bounce flex items-center gap-2">
                            <span className="material-symbols-outlined">check</span> ¡Excelente!
                        </span>
                    )}
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-4 w-full">
                    <button onClick={toggleOrientation} className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-bold transition-all text-sm hover:bg-slate-50 shadow-sm hover:-translate-y-1 w-full">
                        <span className="material-symbols-outlined">rotate_right</span>
                        Rotar Tablero
                    </button>

                    <button
                        onClick={() => navigate('/learn/pieces')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-black shadow-comic-primary hover:scale-105 transition-transform w-full text-sm uppercase tracking-wide"
                    >
                        <span className="material-symbols-outlined text-xl">extension</span>
                        Aprender Piezas
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CoordinateTrainingPage;