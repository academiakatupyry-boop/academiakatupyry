import React from 'react';

interface PathNodeProps {
    status: 'locked' | 'current' | 'completed';
    icon: string;
    title?: string;
    onClick: () => void;
    position?: 'left' | 'center' | 'right';
}

const PathNode: React.FC<PathNodeProps> = ({ status, icon, title, onClick, position = 'center' }) => {

    // Position classes to create the winding path effect
    const positionClasses = {
        left: '-translate-x-12 md:-translate-x-24',
        center: '',
        right: 'translate-x-12 md:translate-x-24'
    };

    const baseClasses = "relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 z-10 font-bold border-b-4 select-none";

    const statusClasses = {
        locked: "bg-gray-300 border-gray-400 text-gray-400 cursor-not-allowed grayscale",
        completed: "bg-yellow-400 border-yellow-600 text-white shadow-btn-secondary hover:brightness-110 active:translate-y-1 active:shadow-none",
        current: "bg-secondary-adventure border-orange-600 text-white shadow-btn-secondary animate-pulse-slow scale-110 ring-4 ring-yellow-200 ring-opacity-50 hover:scale-115 cursor-pointer"
    };

    return (
        <div className={`flex flex-col items-center justify-center py-4 ${positionClasses[position]}`}>
            <button
                onClick={status !== 'locked' ? onClick : undefined}
                className={`${baseClasses} ${statusClasses[status]}`}
            >
                {status === 'completed' ? (
                    <span className="material-symbols-outlined text-4xl md:text-5xl drop-shadow-md">check</span>
                ) : (
                    <span className="material-symbols-outlined text-3xl md:text-4xl drop-shadow-md">{icon}</span>
                )}

                {/* Star rating or Crown for completed/current */}
                {status !== 'locked' && (
                    <div className="absolute -top-2 -right-2 bg-white text-yellow-500 rounded-full p-1 border-2 border-yellow-100 shadow-sm">
                        <span className="material-symbols-outlined text-sm font-black w-4 h-4 flex items-center justify-center">star</span>
                    </div>
                )}

                {/* Connector Line (Virtual, helps visualize flow in dev, usually handled by parent SVG) */}
            </button>

            {/* Title Label Bubble */}
            <div className={`mt-3 px-4 py-2 bg-white rounded-xl border-2 border-gray-200 shadow-sm text-center transform transition-all hover:scale-105 ${status === 'locked' ? 'opacity-50' : ''}`}>
                <h3 className="font-black text-slate-700 text-sm md:text-base uppercase tracking-wider">{title}</h3>
            </div>
        </div>
    );
};

export default PathNode;
