import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseBoard } from '../features/learning/components/BaseBoard';

const LessonPage: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen bg-slate-50 flex flex-col md:flex-row font-body text-slate-800">
            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center w-full max-w-2xl flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Lección: {topicId}</h1>
                    <p className="text-slate-500 mb-8">Fase 1: Tablero Base Interactivo (Libre)</p>
                    {/* New Modular Board */}
                    <div className="w-[min(90vw,60vh)] aspect-square">
                        <BaseBoard />
                    </div>
                </div>
            </div>

            {/* Sidebar Placeholder */}
            <div className="w-full md:w-[350px] bg-white border-l border-slate-200 p-4">
                <button onClick={() => navigate('/learn')} className="text-slate-400">
                    <span className="material-symbols-outlined">close</span> Salir
                </button>
            </div>
        </div>
    );
};

export default LessonPage;
