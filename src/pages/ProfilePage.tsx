import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2';

// --- Interfaces ---
interface UserProfile {
    id: string;
    username: string;
    avatar_url?: string;
    joined_at?: string;
    subscription_level?: string;
}

interface UserStats {
    total_xp: number;
    lessons_completed: number;
    puzzles_solved: number;
    streak: number; // Placeholder for now
    league: string; // Calculated based on XP
}

interface ProfilePageProps {
    initialTab?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ initialTab = 'Visión general' }) => {
    const navigate = useNavigate(); // Hook for navigation

    // Auth State
    const [session, setSession] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    // Stats State
    const [stats, setStats] = useState<UserStats>({
        total_xp: 0,
        lessons_completed: 0,
        puzzles_solved: 0,
        streak: 0,
        league: 'Bronce'
    });

    // UI State
    const [activeTab, setActiveTab] = useState(initialTab);

    // Form State
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loadingAction, setLoadingAction] = useState(false);

    // --- Effects ---
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                fetchProfile(session.user.id);
                fetchStats(session.user.id);
            } else {
                setLoadingAuth(false);
            }
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                fetchProfile(session.user.id);
                fetchStats(session.user.id);
            } else {
                setProfile(null);
                setLoadingAuth(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) setProfile(data);
            if (error) console.error('Error fetching profile:', error);
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoadingAuth(false);
        }
    };

    const fetchStats = async (userId: string) => {
        try {
            // 1. Get Progress Data (Lessons & Puzzles together usually)
            const { data: progressData, error } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', userId);

            if (error) throw error;

            if (progressData) {
                const totalXP = progressData.reduce((acc, curr) => acc + (curr.score || 0), 0);
                const lessonsCount = progressData.filter(p => p.status === 'completed').length;

                // Determine League
                let league = 'Bronce';
                if (totalXP > 500) league = 'Plata';
                if (totalXP > 1000) league = 'Oro';
                if (totalXP > 2000) league = 'Diamante';

                setStats({
                    total_xp: totalXP,
                    lessons_completed: lessonsCount,
                    puzzles_solved: 0, // Need separate tracking for this later if distinct from lessons
                    streak: 1, // Mock streak for now
                    league: league
                });
            }
        } catch (err) {
            console.error("Error fetching stats:", err);
        }
    };


    // --- Handlers ---
    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingAction(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Session listener will handle the rest
            } else {
                // Register
                if (username.length < 3) throw new Error("El nombre de usuario debe tener al menos 3 caracteres.");

                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { username },
                    }
                });

                if (authError) throw authError;

                if (authData.user) {
                    await supabase.from('profiles').insert([{
                        id: authData.user.id,
                        username: username,
                        updated_at: new Date().toISOString(),
                    }]);

                    Swal.fire({
                        title: '¡Bienvenido!',
                        text: `Cuenta creada para ${username}.`,
                        icon: 'success',
                        confirmButtonText: '¡A jugar!',
                        confirmButtonColor: '#FBBF24'
                    });
                }
            }
        } catch (err: any) {
            Swal.fire({
                title: 'Error',
                text: err.message || 'Error inesperado.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#EF4444'
            });
        } finally {
            setLoadingAction(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsLogin(true);
    };

    // --- Render ---

    if (loadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-500"></div>
            </div>
        );
    }

    // 1. Authenticated View (Redesigned)
    if (session) {
        return (
            <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 pt-8 md:pt-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-xl transform group-hover:rotate-3 transition duration-300">
                                <img
                                    src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (profile?.username || 'user')}
                                    alt="Avatar"
                                    className="w-full h-full object-cover bg-blue-100"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xs font-bold">bolt</span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">{profile?.username || 'Jugador'}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-xl text-xs font-black uppercase tracking-wider">
                                    {profile?.subscription_level !== 'none' ? 'Premium' : 'Básico'}
                                </span>
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-xl text-xs font-black uppercase tracking-wider">
                                    Liga {stats.league}
                                </span>
                                <span className="px-3 py-1 bg-slate-200 text-slate-600 rounded-xl text-xs font-bold">
                                    Se unió {new Date(profile?.joined_at || Date.now()).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>

                            <div className="flex gap-3 justify-center md:justify-start">
                                <button className="px-4 py-2 bg-white border-2 border-slate-200 border-b-4 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 active:border-b-2 active:translate-y-[2px] transition-all text-sm uppercase tracking-wide">
                                    Editar Perfil
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-white border-2 border-red-100 border-b-4 text-red-400 font-bold rounded-2xl hover:bg-red-50 hover:border-red-200 active:border-b-2 active:translate-y-[2px] transition-all text-sm uppercase tracking-wide"
                                >
                                    Salir
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT COLUMN (Stats) */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Stats Overview */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard icon="local_fire_department" value={stats.streak.toString()} label="Racha Días" color="text-orange-500" />
                                <StatCard icon="electric_bolt" value={stats.total_xp.toString()} label="Experiencia" color="text-yellow-500" />
                                <StatCard icon="emoji_events" value={stats.league} label="Liga" color="text-purple-500" />
                                <StatCard icon="school" value={stats.lessons_completed.toString()} label="Lecciones" color="text-blue-500" />
                            </div>

                            {/* Tabs (Simplified) */}
                            <div className="border-b-2 border-slate-200 flex gap-6">
                                {['Visión general', 'Partidas'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 px-2 font-black text-sm uppercase tracking-wide transition-colors ${activeTab === tab
                                                ? 'text-blue-500 border-b-2 border-blue-500 -mb-[2px]'
                                                : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Detailed List (Placeholder for now) */}
                            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-black text-slate-700 text-lg">Actividad Reciente</h3>
                                    <button className="text-blue-500 font-bold text-sm hover:underline">Ver todo</button>
                                </div>
                                <div className="space-y-4">
                                    {/* Mock Activities */}
                                    <ActivityItem
                                        icon="check_circle"
                                        color="bg-green-100 text-green-600"
                                        title="Lección Completada"
                                        desc="Movimiento del Alfil"
                                        xp="+10 XP"
                                    />
                                    <ActivityItem
                                        icon="emoji_events"
                                        color="bg-yellow-100 text-yellow-600"
                                        title="Nuevo Logro"
                                        desc="Primeros pasos"
                                        xp=""
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN (Sidebar) */}
                        <div className="space-y-6">

                            {/* Premium Card */}
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white text-center relative overflow-hidden shadow-lg transform transition hover:scale-[1.02]">
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-5xl mb-3 block drop-shadow-md">diamond</span>
                                    <h3 className="text-xl font-black mb-1">Katupyry Premium</h3>
                                    <p className="text-indigo-100 text-sm mb-4 font-medium">Desbloquea análisis ilimitado y ejercicios exclusivos.</p>
                                    <button
                                        onClick={() => navigate('/subscription')}
                                        className="w-full bg-white text-indigo-600 font-black py-3 rounded-xl shadow-lg border-b-4 border-indigo-100 active:border-b-0 active:translate-y-[4px] transition-all uppercase tracking-wide text-sm"
                                    >
                                        Mejorar Plan
                                    </button>
                                </div>
                                {/* Decorative Circles */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10"></div>
                                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-x-5 translate-y-5"></div>
                            </div>

                            {/* Friends / Ranking Placeholder */}
                            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6">
                                <h3 className="font-black text-slate-700 mb-4">Amigos</h3>
                                <div className="text-center py-6 text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">person_add</span>
                                    <p className="text-sm font-bold">Aún no sigues a nadie.</p>
                                    <button className="mt-4 text-blue-500 font-bold text-sm uppercase tracking-wide hover:underline">Buscar amigos</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }

    // 2. Unauthenticated View (Login Form - Simplified Style)
    return (
        <div className="pt-24 pb-12 min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-slate-100 max-w-md w-full relative">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg rotate-3">
                        <span className="material-symbols-outlined text-4xl text-white">castle</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 mb-2">
                        {isLogin ? '¡Hola Maestro!' : 'Únete a la Academia'}
                    </h1>
                    <p className="text-slate-500 font-bold text-sm">
                        {isLogin ? 'Ingresa para seguir aprendiendo.' : 'Empieza tu camino hacia la maestría.'}
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleAuth}>
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase text-slate-400 ml-2">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                                placeholder="Tu nombre"
                                required
                            />
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                            placeholder="hola@ejemplo.com"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase text-slate-400 ml-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-700 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loadingAction}
                        className="w-full bg-blue-500 hover:bg-blue-400 text-white font-black py-4 rounded-xl shadow-lg border-b-4 border-blue-700 active:border-b-0 active:translate-y-[4px] transition-all uppercase tracking-wide text-sm mt-4"
                    >
                        {loadingAction ? 'Cargando...' : (isLogin ? 'ENTRAR' : 'CREAR CUENTA')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-400 font-bold text-sm hover:text-blue-500 transition-colors uppercase tracking-wide"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Ingresa'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const StatCard = ({ icon, value, label, color }: { icon: string, value: string, label: string, color: string }) => (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
        <span className={`material-symbols-outlined text-3xl mb-2 ${color}`}>{icon}</span>
        <span className="text-2xl font-black text-slate-700">{value}</span>
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{label}</span>
    </div>
);

const ActivityItem = ({ icon, color, title, desc, xp }: { icon: string, color: string, title: string, desc: string, xp: string }) => (
    <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-slate-700 text-sm">{title}</h4>
            <p className="text-xs text-slate-400 font-medium">{desc}</p>
        </div>
        {xp && <span className="text-xs font-black text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">{xp}</span>}
    </div>
);

export default ProfilePage;