```typescript
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import Swal from 'sweetalert2';

const ProfilePage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                
                Swal.fire({
                    title: '¡Bienvenido!',
                    text: 'Has iniciado sesión correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Genial',
                    confirmButtonColor: '#FBBF24', // Amber/Yellow theme
                    background: '#fff',
                    backdrop: `
rgba(0, 0, 123, 0.4)
                        left top
no - repeat
    `
                });
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;

                Swal.fire({
                    title: '¡Registro Exitoso!',
                    text: 'Revisa tu correo para confirmar tu cuenta.',
                    icon: 'success',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#FBBF24'
                });
            }
        } catch (err: any) {
            Swal.fire({
                title: '¡Ups!',
                text: err.message || 'Ha ocurrido un error inesperado.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                confirmButtonColor: '#EF4444'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-sky pt-32 pb-24 font-body flex items-center justify-center relative">
            <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(#6dd5ed 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>

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
                        disabled={loading}
                        className="w-full bg-secondary-adventure hover:bg-yellow-400 text-primary-island font-black py-4 rounded-2xl shadow-[0_4px_0_rgb(180,130,0)] hover:shadow-[0_2px_0_rgb(180,130,0)] hover:translate-y-[2px] transition-all border-2 border-yellow-400 active:translate-y-[4px] active:shadow-none text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                        }}
                        className="text-sm font-bold text-gray-400 hover:text-primary-island transition-colors underline decoration-2 decoration-transparent hover:decoration-primary-island"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
```