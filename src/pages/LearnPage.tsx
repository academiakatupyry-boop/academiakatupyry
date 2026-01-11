import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';

const LearnPage: React.FC = () => {
    const navigate = useNavigate();

    const checkmates = lessons.filter(l => l.category === 'checkmates');
    const patterns = lessons.filter(l => l.category === 'patterns');

    return (
        <div className="min-h-screen bg-background-dark text-white pt-28 pb-12 font-body relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-island rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-adventure rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black font-display mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-primary-island">
                        Centro de Aprendizaje
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Domina el arte del ajedrez lección por lección. Desde los mates básicos hasta los patrones más elegantes.
                    </p>
                </div>

                {/* Section: Mates */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white/90 border-b border-white/10 pb-4">
                        <span className="material-symbols-outlined text-yellow-500">emoji_events</span>
                        Mates Fundamentales
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {checkmates.map(topic => (
                            <div
                                key={topic.id}
                                onClick={() => navigate(`/learn/${topic.id}`)}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-island/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-3 rounded-xl group-hover:bg-primary-island group-hover:text-white transition-colors text-gray-300">
                                        <span className="material-symbols-outlined text-3xl">{topic.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-light transition-colors">{topic.title}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">{topic.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section: Patterns */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white/90 border-b border-white/10 pb-4">
                        <span className="material-symbols-outlined text-teal-400">extension</span>
                        Patrones Tácticos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {patterns.map(topic => (
                            <div
                                key={topic.id}
                                onClick={() => navigate(`/learn/${topic.id}`)}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 rounded-2xl p-5 cursor-pointer transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="bg-white/10 p-2.5 rounded-xl group-hover:bg-teal-500 group-hover:text-white transition-colors text-gray-300">
                                        <span className="material-symbols-outlined text-2xl">{topic.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold group-hover:text-teal-300 transition-colors">{topic.title}</h3>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed pl-[3.25rem]">
                                    {topic.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnPage;
