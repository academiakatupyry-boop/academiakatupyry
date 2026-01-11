import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import PathNode from '../components/PathNode';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

const LearnPage: React.FC = () => {
    const navigate = useNavigate();
    const [progressMap, setProgressMap] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState<User | null>(null);

    // Fetch Progress
    React.useEffect(() => {
        const fetchProgress = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (!user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('user_progress')
                .select('lesson_id, status')
                .eq('user_id', user.id);

            if (data) {
                const map: Record<string, string> = {};
                data.forEach((item: any) => {
                    map[item.lesson_id] = item.status;
                });
                setProgressMap(map);
            }
            setLoading(false);
        };
        fetchProgress();
    }, []);

    // Determine Status
    const getStatus = (lessonId: string, index: number) => {
        if (loading) return 'locked';

        // If user finished this lesson
        if (progressMap[lessonId] === 'completed') return 'completed';

        // Check if previous lesson is completed (or if it's the first one)
        if (index === 0) return 'current'; // First lesson always unlocked if not completed

        const pathLessons = lessons.filter(l => l.category !== 'basics');
        const prevLessonId = pathLessons[index - 1].id;
        if (progressMap[prevLessonId] === 'completed') return 'current';

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
        <div className="w-full flex justify-center">

            <div className="w-full max-w-md relative z-10 flex flex-col items-center space-y-8 pb-32">

                {/* Registration Card (Upsell) */}
                {!loading && !user && (
                    <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] p-6 text-white shadow-comic-primary mb-4 transform hover:scale-105 transition-transform cursor-pointer relative overflow-hidden" onClick={() => navigate('/profile')}>
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <h2 className="text-xl font-black uppercase mb-1 flex items-center gap-2">
                                <span className="material-symbols-outlined">save</span>
                                ¡No pierdas tu racha!
                            </h2>
                            <p className="font-bold text-white/90 text-sm mb-4">
                                Regístrate gratis para guardar tu progreso y ganar insignias.
                            </p>
                            <button className="bg-white text-primary-island font-black py-2 px-6 rounded-xl shadow-btn hover:shadow-btn-hover active:translate-y-[2px] active:shadow-none transition-all w-full">
                                Crear Cuenta
                            </button>
                        </div>
                    </div>
                )}

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

                    {lessons.filter(l => l.category !== 'basics').map((lesson, index) => (
                        <PathNode
                            key={lesson.id}
                            status={getStatus(lesson.id, index)}
                            icon={lesson.icon}
                            title={lesson.title}
                            position={getPosition(index)}
                            onClick={() => {
                                const s = getStatus(lesson.id, index);
                                if (s !== 'locked') {
                                    navigate(`/learn/${lesson.id}`)
                                }
                            }}
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
