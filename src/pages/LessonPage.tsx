import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseBoard } from '../features/learning/components/BaseBoard';
import { useCurrentPuzzle } from '../features/learning/hooks/useCurrentPuzzle';

const LessonPage: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const { puzzle, loading, error } = useCurrentPuzzle();

    return (
        <div className="w-full h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden font-body text-slate-800">
            {/* 1. Main Content Area (Board) */}
            <div className="flex-1 order-1 md:order-2 flex items-center justify-center p-2 md:p-0 relative bg-slate-100">
                <div className="w-[min(90vw,85vh)] aspect-square shadow-xl rounded-sm relative">
                    {error ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-sm">
                            <p className="text-red-500 font-bold">{error}</p>
                        </div>
                    ) : (
                        <BaseBoard
                            fen={puzzle?.fen}
                            isLoading={loading}
                            orientation="white" // We'll fix this dynamic orientation later
                        />
                    )}
                </div>
            </div>

            {/* 2. Sidebar (Info) */}
            <div className="w-full md:w-[350px] lg:w-[400px] h-[35vh] md:h-full order-2 md:order-1 bg-white flex flex-col border-t md:border-t-0 md:border-r border-slate-200 relative z-20 shadow-lg">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <button onClick={() => navigate('/learn')} className="text-slate-400 hover:text-primary-island transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-primary-island uppercase tracking-wider">Práctica</span>
                        <h2 className="text-sm font-bold text-slate-800">Lección: {topicId}</h2>
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
                                <span className="opacity-80 text-xs mt-1 block font-medium">Reconstruyendo...</span>
                            </p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between text-xs font-bold mb-3 uppercase text-slate-400">
                            <span>Progreso</span>
                            <span className="text-slate-600">0 / 5</span>
                        </div>
                        <div className="flex gap-2.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-2.5 flex-1 rounded-full bg-slate-200 transition-all duration-300"
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
