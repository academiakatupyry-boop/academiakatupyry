import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PrototypeNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Si estamos en el tablero o en ejercicios inmersivos, ocultar la navegación
    if (location.pathname === '/board' || location.pathname === '/learn/coordinates' || location.pathname === '/learn/pieces') {
        return null;
    }

    const screens = [
        { path: "/learn", label: "Aprender", icon: "school" },
        { path: "/board", label: "Tablero", icon: "sports_esports" },
        { path: "/arena", label: "Torneos", icon: "swords" },
        { path: "/chronicles", label: "Noticias", icon: "auto_stories" },
        { path: "/market", label: "Tienda", icon: "storefront" },
        { path: "/schools", label: "Escuela", icon: "school" },
        { path: "/profile", label: "Perfil", icon: "account_circle" }
    ];

    return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] w-[95vw] max-w-7xl font-sans">
            <div className="bg-white/95 backdrop-blur-md shadow-cartoon-lg rounded-2xl border-4 border-white flex items-center justify-between px-3 py-2 md:px-6 md:py-3 transition-all hover:border-secondary-adventure/30 gap-4">
                {/* Logo Section */}
                <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-secondary-adventure rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <img src="/isologosvg.svg" alt="Katupyry" className="w-12 h-12 md:w-16 md:h-16 relative z-10 transform group-hover:scale-110 transition-transform" />
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto hide-scrollbar px-2 mask-linear">
                    {screens.map(screen => {
                        const isActive = location.pathname === screen.path;
                        return (
                            <button
                                key={screen.path}
                                onClick={() => navigate(screen.path)}
                                aria-label={screen.label}
                                className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${isActive
                                    ? "bg-primary-island text-white shadow-btn-primary transform -translate-y-[1px]"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-primary-island"
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[20px] ${isActive ? "animate-pulse-slow" : ""}`}>{screen.icon}</span>
                                {screen.path !== '/profile' && (
                                    <span className={`${isActive ? "inline-block" : "hidden xl:inline-block"}`}>{screen.label}</span>
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* Right Side - CTA Button ONLY */}
                <div className="hidden md:flex items-center shrink-0">
                    <button
                        onClick={() => navigate('/school-form')}
                        className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-secondary-adventure to-orange-500 text-white px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] transition-all font-black text-[11px] sm:text-xs uppercase tracking-wide border-2 border-orange-300/50 active:shadow-none active:translate-y-[4px] animate-pulse-slow group hover:scale-105"
                    >
                        <span className="material-symbols-outlined text-lg sm:text-xl filled group-hover:rotate-12 transition-transform">school</span>
                        <span className="truncate">Quiero Katupyry en mi escuela</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PrototypeNav;