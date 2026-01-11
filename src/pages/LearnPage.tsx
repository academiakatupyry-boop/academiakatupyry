import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import PathNode from '../components/PathNode';

const LearnPage: React.FC = () => {
    const navigate = useNavigate();

    // Mock progress: First 2 unlocked, 1 completed
    const getStatus = (index: number) => {
        if (index === 0) return 'completed';
        if (index === 1) return 'current';
        return 'locked';
    };

    // Helper to determine Zig-Zag position
    const getPosition = (index: number) => {
        const mod = index % 4;
        if (mod === 0) return 'center';
        if (mod === 1) return 'left';
        if (mod === 2) return 'center';
        return 'right';
    };

    return (
        <div className="min-h-screen bg-background-light py-12 px-4 relative flex justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>

            <div className="w-full max-w-md relative z-10 flex flex-col items-center space-y-8 pb-32">

                {/* Header (Floating island style) */}
                <div className="bg-white border-b-4 border-slate-200 rounded-[2rem] p-6 text-center w-full mb-8 shadow-panel">
                    <h1 className="text-2xl font-black text-slate-700 uppercase tracking-widest mb-2">Ruta de Aprendizaje</h1>
                    <div className="bg-primary-island/10 rounded-xl py-2 px-4 inline-block">
                        <span className="text-primary-island font-bold text-sm">Nivel 1: Conceptos Básicos</span>
                    </div>
                </div>

                {/* The Path */}
                <div className="relative w-full flex flex-col items-center gap-6">
                    {/* SVG Connector Line (Background Layer) */}
                    {/* Simplified straight dashed line for prototype. Complex SVG requires calculating coordinates */}
                    <div className="absolute top-12 bottom-12 w-2 border-l-4 border-dashed border-slate-300 z-0 opacity-50"></div>

                    {lessons.map((lesson, index) => (
                        <PathNode
                            key={lesson.id}
                            status={getStatus(index)}
                            icon={lesson.icon}
                            title={lesson.title}
                            position={getPosition(index)}
                            onClick={() => navigate(`/ learn / ${lesson.id} `)}
                        />
                    ))}

                    {/* End of Path Trophy */}
                    <div className="mt-12 flex flex-col items-center opacity-50 grayscale">
                        <img src="/isologo.png" className="w-32 h-32 mb-4 animate-bounce-slow" alt="Trophy" />
                        <span className="font-black text-slate-400 uppercase tracking-widest">Próximamente más niveles</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnPage;
