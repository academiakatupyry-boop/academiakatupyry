import React from 'react';

interface CardProps {
    title: string;
    description: string;
    icon: string;
    colorClass: string;
    rotateClass: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon, colorClass, rotateClass }) => {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-cartoon border-4 border-text-dark-fun hover:translate-y-[-4px] transition-transform duration-300">
            <div className="p-8 flex flex-col flex-grow relative">
                <div className={`absolute -top-4 -right-4 ${colorClass} text-white w-16 h-16 flex items-center justify-center rounded-full shadow-cartoon transform ${rotateClass} group-hover:rotate-12 transition-transform`}>
                    <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <h3 className="text-2xl font-black font-display text-text-dark-fun mb-3 mt-4">{title}</h3>
                <p className="text-gray-600 mb-6 font-bold leading-relaxed text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
