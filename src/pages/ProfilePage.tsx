import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

// --- Interfaces ---
interface UserProfile {
    id: string;
    username: string;
    avatar_url?: string;
    joined_at?: string;
}

interface ProfilePageProps {
    initialTab?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ initialTab = 'Visión general' }) => {
    // Auth State
    const [session, setSession] = useState<any>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);

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
            if (session) fetchProfile(session.user.id);
            else setLoadingAuth(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchProfile(session.user.id);
            else {
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

            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setProfile(data);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoadingAuth(false);
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
                        data: { username }, // Helper for meta
                    }
                });

                if (authError) throw authError;

                if (authData.user) {
                    // Create Profile
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert([{
                            id: authData.user.id,
                            username: username,
                            updated_at: new Date().toISOString(),
                        }]);

                    if (profileError) {
                        if (profileError.code === '23505') {
                            throw new Error("Este nombre de usuario ya está en uso.");
                        }
                        throw profileError;
                    }

                    Swal.fire({
                        title: '¡Bienvenido a la Academia!',
                        text: `Tu cuenta ha sido creada con éxito, ${username}.`,
                        icon: 'success',
                        confirmButtonText: '¡A jugar!',
                        confirmButtonColor: '#FBBF24'
                    });
                }
            }
        } catch (err: any) {
            Swal.fire({
                title: 'Error',
                text: err.message || 'Ocurrió un error inesperado.',
                icon: 'error',
                confirmButtonText: 'Entendido',
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
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    // 1. Authenticated View (The New Profile)
    if (session) {
        return (
            <div className="min-h-screen bg-[#1b1b1b] text-gray-200 font-sans pb-20 pt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header Section */}
                    <div className="bg-[#262626] rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-lg mb-8 relative">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden border-4 border-[#333]">
                                <img
                                    src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (profile?.username || 'user')}
                                    alt="Avatar"
                                    className="w-full h-full object-cover bg-slate-700"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#262626]" title="En línea"></div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div className="flex flex-col md:flex-row items-center gap-3">
                                <h1 className="text-3xl font-bold text-white">{profile?.username || 'Jugador'}</h1>
                                <span className="bg-slate-700 text-xs text-gray-300 px-2 py-1 rounded border border-slate-600">
                                    🇲🇽 México
                                </span>
                                <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition">
                                    Añadir distintivo
                                </button>
                            </div>

                            <p className="text-gray-400 italic text-sm">
                                "Aprendiz de Katupyry" <span className="text-slate-600 cursor-pointer ml-1 text-xs">✏️</span>
                            </p>

                            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-gray-500 mt-2">
                                <span>Se unió el {new Date(profile?.joined_at || Date.now()).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                <span>• 0 amigos</span>
                                <span>• 0 visualizaciones</span>
                            </div>
                        </div>

                        {/* Edit / Logout Actions */}
                        <div className="flex flex-col gap-2 absolute top-4 right-4">
                            <button className="bg-slate-700 hover:bg-slate-600 text-gray-300 px-4 py-2 rounded text-sm font-semibold transition">
                                Editar perfil
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-900/20 hover:bg-red-900/40 text-red-400 px-4 py-2 rounded text-sm font-semibold transition"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>

                    {/* Stats & Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Main Stats Column (Left - 2cols wide on large) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Tabs */}
                            <div className="flex border-b border-gray-700 mb-4 overflow-x-auto">
                                {['Visión general', 'Partidas', 'Estadísticas', 'Amigos', 'Premios'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-3 text-sm font-medium ${activeTab === tab ? 'text-green-400 border-b-2 border-green-500' : 'text-gray-400 hover:text-white transition'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Banner: Solve / Repeat */}
                            <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/10 border border-orange-500/20 rounded-lg p-6 flex items-center justify-between relative overflow-hidden group">
                                <div className="z-10 relative">
                                    <h2 className="text-2xl font-black text-white mb-1">¡Entrena tu mente!</h2>
                                    <p className="text-orange-200/60 mb-4 text-sm">Resuelve rompecabezas para mejorar.</p>
                                    <button className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition transform hover:scale-105">
                                        Resolver Puzzles
                                    </button>
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/chess.png')] opacity-10"></div>
                                <span className="material-symbols-outlined text-[100px] absolute -right-4 -bottom-8 text-orange-500/10 rotate-12 group-hover:rotate-0 transition duration-700">extension</span>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#262626] p-6 rounded-lg text-center hover:bg-[#2a2a2a] transition">
                                    <span className="material-symbols-outlined text-4xl text-gray-500 mb-2">pawn</span>
                                    <div className="text-3xl font-black text-white">0</div>
                                    <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Partidas</div>
                                </div>
                                <div className="bg-[#262626] p-6 rounded-lg text-center hover:bg-[#2a2a2a] transition">
                                    <span className="material-symbols-outlined text-4xl text-orange-500 mb-2">extension</span>
                                    <div className="text-3xl font-black text-white">0</div>
                                    <div className="text-sm text-gray-500 uppercase font-bold tracking-wider">Problemas</div>
                                </div>
                            </div>

                            {/* Detailed Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <StatItem icon="sunny" value="898" label="Correspondencia" color="text-yellow-400" />
                                <StatItem icon="bolt" value="1683" label="Blitz" color="text-yellow-400" />
                                <StatItem icon="rocket_launch" value="1508" label="Bala" color="text-yellow-400" />
                                <StatItem icon="timer" value="1683" label="Rápida" color="text-green-400" />
                                <StatItem icon="chess" value="1491" label="960 en vivo" color="text-orange-400" />
                                <StatItem icon="extension" value="1491" label="Pasapiezas" color="text-green-500" />
                            </div>

                        </div>

                        {/* Sidebar Column (Right) */}
                        <div className="space-y-4">

                            {/* Sidebar Stats List */}
                            <div className="bg-[#1f1f1f] rounded-lg p-4 font-mono text-sm">
                                <h3 className="text-gray-400 font-bold mb-4 uppercase text-xs">Estadísticas</h3>
                                <ul className="space-y-3">
                                    <RightStatRow icon="bolt" label="Blitz" value="1683" />
                                    <RightStatRow icon="rocket_launch" label="Bala" value="1508" />
                                    <RightStatRow icon="extension" label="Puzzle Rush" value="21" />
                                    <RightStatRow icon="sunny" label="Por corresp..." value="898" />
                                    <li className="flex justify-between items-center pt-2 border-t border-gray-700 text-gray-500 hover:text-white cursor-pointer transition">
                                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">layers</span> Aperturas</span>
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Ad Placeholder */}
                            <div className="bg-[#0f172a] rounded-lg p-6 border border-slate-800 text-center">
                                <p className="text-blue-400 font-bold mb-2">Katupyry Premium</p>
                                <p className="text-slate-400 text-sm mb-4">Sube de nivel sin límites. Análisis ilimitado.</p>
                                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded py-2 font-bold text-sm transition">
                                    Prueba Gratis
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    }

    // 2. Unauthenticated View (Login/Register Form) - Kept mostly same as before but wrapped clean
    return (
        <div className="pt-32 pb-24 font-body flex items-center justify-center relative min-h-screen">
            <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-cartoon-lg border-4 border-white max-w-md w-full relative z-10 mx-4">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-primary-island rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg transform -rotate-3">
                        <span className="material-symbols-outlined text-4xl text-white">person</span>
                    </div>
                    <h1 className="text-3xl font-black font-display text-text-dark-fun mb-2">
                        {isLogin ? '¡Hola de nuevo!' : 'Únete a la Aventura'}
                    </h1>
                    <p className="text-gray-500 font-bold text-sm">
                        {isLogin ? 'Ingresa para continuar tu entrenamiento.' : 'Crea tu cuenta y empieza a aprender.'}
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleAuth}>
                    {!isLogin && (
                        <div className="space-y-2 animate-wiggle">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-2">Nombre de Usuario</label>
                            <input
                                type="text"
                                placeholder="MaestroAjedrez99"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required={!isLogin}
                                minLength={3}
                                className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3 px-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-2">Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3 px-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-2">Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-background-light border-2 border-gray-200 rounded-2xl py-3 px-4 font-bold text-text-dark-fun focus:outline-none focus:border-primary-island focus:ring-4 focus:ring-primary-island/10 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loadingAction}
                        className="w-full bg-secondary-adventure hover:bg-yellow-400 text-primary-island font-black py-4 rounded-2xl shadow-[0_4px_0_rgb(180,130,0)] hover:shadow-[0_2px_0_rgb(180,130,0)] hover:translate-y-[2px] transition-all border-2 border-yellow-400 active:translate-y-[4px] active:shadow-none text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loadingAction ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-bold text-gray-400 hover:text-primary-island transition-colors underline decoration-2 decoration-transparent hover:decoration-primary-island"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Helper Components ---

const StatItem = ({ icon, value, label, color }: { icon: string, value: string, label: string, color: string }) => (
    <div className="bg-[#262626] p-4 rounded-lg flex flex-col items-center justify-center hover:bg-[#2a2a2a] transition cursor-pointer">
        <span className={`material-symbols-outlined text-3xl mb-2 ${color}`}>{icon}</span>
        <span className="text-2xl font-black text-white">{value}</span>
        <span className="text-xs text-gray-500 font-bold uppercase text-center mt-1">{label}</span>
    </div>
);

const RightStatRow = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
    <li className="flex justify-between items-center text-gray-400">
        <span className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-sm text-yellow-500`}>{icon}</span>
            {label}
        </span>
        <span className="font-bold text-white">{value}</span>
    </li>
);

export default ProfilePage;