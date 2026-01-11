import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import PageTitle from '../components/ui/PageTitle';

const FundamentalsPage: React.FC = () => {
    const navigate = useNavigate();

    // Filter only 'basics' category
    const basicLessons = lessons.filter(l => l.category === 'basics');

    return (
        <div className="min-h-screen bg-background-light py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <PageTitle
                        title="Conceptos"
                        highlight="Fundamentales"
                        description="Domina lo esencial antes de ir a la batalla."
                        className="!text-left !items-start"
                    />
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {basicLessons.map(lesson => (
                        <div
                            key={lesson.id}
                            onClick={() => navigate(`/learn/${lesson.id}`)}
                            className="bg-white rounded-3xl p-6 shadow-panel hover:scale-[1.02] transition-transform cursor-pointer border-b-4 border-slate-200 active:border-b-0 active:translate-y-1"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-2xl bg-secondary-adventure/20 flex items-center justify-center text-secondary-adventure">
                                    <span className="material-symbols-outlined text-4xl">{lesson.icon}</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-700">{lesson.title}</h2>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Básico</span>
                                </div>
                            </div>
                            <p className="text-slate-500 font-bold leading-relaxed">
                                {lesson.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FundamentalsPage;
