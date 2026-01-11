import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chessground } from 'chessground';
import { getLessonById, Exercise } from '../data/lessons';
import '../index.css'; // Ensure styles are loaded
import Swal from 'sweetalert2';

// Note: We might need a proper chess logic library like chess.js to validate moves if we don't want to hardcore everything.
// For now, I'll simulate move validation or use a simple FEN check if simple.
// Assuming 'chess.js' might be needed. If not installed, I'll use basic move handling or ask user.
// But I saw 'chessground' in package.json. 'chess.js' is often paired. I'll assume usage or mocking.
// Wait, I don't see chess.js in package.json previously viewed. I see 'chessground' only.
// I will implement a visual-only board or use chessground's move ability, but properly solving chess requires chess.js.
// I'll check package.json again or just implement basic setup.
// Actually, for "Mates", we need rule enforcement (valid moves).
// I will create a minimal version that just shows the board and lets you move, but for real validation we need chess.js.
// Since I can't install packages without permission, I will use a placeholder logic or assume chess.js presence if installed.
// Oops, package.json had: "chessground": "9.1.1". No chess.js.
// I'll stick to visual config for now and let the user know they need logic for full validation.
// OR I can implement basic types.

const LessonPage: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const topic = getLessonById(topicId || '');
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const boardRef = useRef<HTMLDivElement>(null);
    const [api, setApi] = useState<any>(null);

    useEffect(() => {
        if (!topic) {
            navigate('/learn');
            return;
        }
    }, [topic, navigate]);

    useEffect(() => {
        if (boardRef.current && topic) {
            const exercise = topic.exercises[currentExerciseIndex];
            if (!exercise) return;

            const chessgroundApi = Chessground(boardRef.current, {
                fen: exercise.fen,
                orientation: 'white', // Or dynamic based on puzzle
                movable: {
                    free: true, // Allow free movement for prototyping if no rules engine
                    color: 'white',
                    dests: new Map(), // We need a way to generate legal moves. 
                    // Without chess.js, generating legal moves is hard. 
                    // For this step, I'll allow free movement to demonstrate UI.
                },
                events: {
                    move: (orig, dest) => {
                        // Very basic check: Does the move match solution string?
                        const moveString = `${orig}${dest}`;
                        if (exercise.solution.includes(moveString)) {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Correcto!',
                                text: 'Muy bien jugado.',
                                timer: 1500,
                                showConfirmButton: false
                            });
                        } else {
                            // Incorrect
                        }
                    }
                }
            });
            setApi(chessgroundApi);

            return () => {
                chessgroundApi.destroy();
            }
        }
    }, [topic, currentExerciseIndex]);

    if (!topic) return null;

    const exercise = topic.exercises[currentExerciseIndex];

    return (
        <div className="min-h-screen bg-background-dark text-white pt-24 pb-12 font-body flex flex-col md:flex-row h-screen">
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
                        {exercise?.instruction || 'Cargando ejercicio...'}
                    </p>
                </div>

                {/* Progress / Navigation */}
                <div className="mt-6">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>Ejercicio {currentExerciseIndex + 1} de {topic.exercises.length}</span>
                        <span>{Math.round(((currentExerciseIndex + 1) / topic.exercises.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                        <div
                            className="bg-primary-island h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((currentExerciseIndex + 1) / topic.exercises.length) * 100}%` }}
                        ></div>
                    </div>

                    <button className="w-full bg-secondary-adventure hover:bg-yellow-400 text-primary-island font-black py-3 rounded-xl transition-colors shadow-btn-primary">
                        Siguiente Ejercicio
                    </button>
                </div>
            </div>

            {/* Board Area */}
            <div className="flex-1 flex items-center justify-center bg-black/20 relative p-4">
                {/* Decorative Background */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="w-full max-w-[600px] aspect-square shadow-board rounded-lg overflow-hidden border-8 border-white/10 relative z-10" ref={boardRef}>
                    {/* Chessground mounts here */}
                </div>
            </div>
        </div>
    );
};

export default LessonPage;
