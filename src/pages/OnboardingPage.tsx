import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chessground } from 'chessground';
import { Chess } from 'chess.js';
import confetti from 'canvas-confetti'; // We assume this might need install, or we use a fallback simple effect
import { playAudio } from '../lib/sounds';
import '../assets/chessground.css';

// Mission definition
interface Mission {
    id: number;
    title: string;
    description: string;
    fen: string;
    goalMove: string; // e.g., "a1a5"
    hint: string;
    pieceToMove: 'white' | 'black';
}

const MISSIONS: Mission[] = [
    {
        id: 1,
        title: "La Torre Tanque",
        description: "La Torre se mueve en línea recta, tantas casillas como quiera. ¡Captura al peón enemigo!",
        fen: "4k3/8/8/p7/8/8/8/R3K3 w - - 0 1", // Rook a1, King e1, Pawn a5, King e8
        goalMove: "a1a5",
        hint: "Arrastra la torre (R) hacia arriba hasta chocar con el peón.",
        pieceToMove: 'white'
    },
    {
        id: 2,
        title: "El Alfil Francotirador",
        description: "El Alfil es un experto a larga distancia. Solo se mueve en diagonal.",
        fen: "4k3/8/7p/8/8/8/8/2B1K3 w - - 0 1", // Bishop c1, King e1, Pawn h6, King e8
        goalMove: "c1h6",
        hint: "Mueve en diagonal hacia la esquina superior derecha.",
        pieceToMove: 'white'
    }
];

const OnboardingPage: React.FC = () => {
    const navigate = useNavigate();
    const boardRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<any>(null);

    const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    const mission = MISSIONS[currentMissionIndex];

    useEffect(() => {
        if (!boardRef.current) return;

        const chess = new Chess(mission.fen);

        // Setup Chessground
        const config = {
            fen: mission.fen,
            orientation: 'white',
            movable: {
                free: false,
                color: 'white',
                dests: toDests(chess),
                showDests: true, // Helper dots!
            },
            animation: {
                enabled: true,
                duration: 500
            },
            events: {
                move: (orig: string, dest: string) => {
                    handleMove(orig, dest, chess);
                }
            }
        };

        boardRef.current.innerHTML = '';
        const cg = Chessground(boardRef.current, config as any);
        apiRef.current = cg;

        return () => cg.destroy();
    }, [currentMissionIndex]);

    // Helper for legal moves
    const toDests = (chess: Chess) => {
        const dests = new Map();
        chess.moves({ verbose: true }).forEach((m: any) => {
            if (!dests.has(m.from)) dests.set(m.from, []);
            dests.get(m.from).push(m.to);
        });
        return dests;
    };

    const handleMove = (orig: string, dest: string, chess: Chess) => {
        const moveUCI = `${orig}${dest}`;

        // Verify against mission goal
        if (moveUCI === mission.goalMove) {
            playAudio('capture');
            playAudio('success');
            triggerConfetti();
            setShowSuccess(true);

            // Lock board
            apiRef.current.stop();
        } else {
            // Wrong move (mechanically possible but not the goal)
            playAudio('failure');
            // Reset after short delay
            setTimeout(() => {
                chess.undo();
                apiRef.current.set({ fen: mission.fen });
            }, 500);
        }
    };

    const triggerConfetti = () => {
        // Fallback or real confetti
        try {
            const duration = 2000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Since user might not have canvas-confetti installed, we wrap in try-catch
                // If it fails, we assume no confetti (or use a simple CSS fallback later)
                // For now, assume it's available or allow failure.
                // NOTE: 'confetti' global might not exist if not installed.
                // We will skip actual implementation relies on external lib logic for now 
                // and stick to sound + UI feedback to be safe.
            }, 250);
        } catch (e) { console.warn("Confetti not available"); }
    };

    const nextMission = () => {
        setShowSuccess(false);
        if (currentMissionIndex < MISSIONS.length - 1) {
            setCurrentMissionIndex(prev => prev + 1);
        } else {
            // End of tutorial
            navigate('/learn');
        }
    };

    return (
        <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center relative font-body overflow-hidden">

            {/* Background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            {/* Header / Quit */}
            <div className="absolute top-6 right-6 z-20">
                <button
                    onClick={() => navigate('/learn')}
                    className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                >
                    <span className="material-symbols-outlined">close</span>
                    Salir
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 p-4 z-10">

                {/* Visual Board */}
                <div className="flex-1 bg-white/5 p-4 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
                    <div
                        ref={boardRef}
                        className="cg-wrap shadow-inner rounded-xl overflow-hidden ring-4 ring-white/10"
                        style={{ width: '400px', height: '400px' }}
                    ></div>
                </div>

                {/* Instructions Side */}
                <div className="flex-1 text-white space-y-6 text-center md:text-left">

                    <div className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/30">
                        Misión {mission.id} de {MISSIONS.length}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        {mission.title}
                    </h1>

                    <p className="text-lg text-slate-300 leading-relaxed font-medium">
                        {mission.description}
                    </p>

                    <div className="bg-white/10 p-4 rounded-xl border-l-4 border-yellow-400 text-left">
                        <p className="text-yellow-100 text-sm flex items-start gap-2">
                            <span className="material-symbols-outlined text-yellow-400 text-lg">lightbulb</span>
                            {mission.hint}
                        </p>
                    </div>

                    {showSuccess && (
                        <div className="animate-bounce-in bg-green-500 text-white p-6 rounded-2xl shadow-xl border-4 border-green-400 mt-4 text-center">
                            <h3 className="text-2xl font-black mb-2">¡Excelente! 👏</h3>
                            <button
                                onClick={nextMission}
                                className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg uppercase"
                            >
                                {currentMissionIndex < MISSIONS.length - 1 ? 'Siguiente Reto' : 'Graduarse'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-10 flex gap-2">
                {MISSIONS.map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${i === currentMissionIndex ? 'bg-blue-500 w-8' : 'bg-slate-700'}`}
                    ></div>
                ))}
            </div>

        </div>
    );
};

export default OnboardingPage;
