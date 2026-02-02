import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileBottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide on specific full-screen pages like the board if needed, 
    // but usually bottom nav is good to keep unless it obstructs game.
    // Let's hide it on the actual game board to maximize space, 
    // but keep it on "Lesson" pages? Or maybe hide on all "Gameplay" screens.
    if (location.pathname === '/board') {
        return null;
    }

    const navItems = [
        { path: "/learn", label: "Aprender", icon: "school" },
        { path: "/arena", label: "Torneos", icon: "swords" },
        { path: "/", label: "Inicio", icon: "rocket_launch", special: true }, // Central Highlight
        { path: "/market", label: "Tienda", icon: "storefront" },
        { path: "/profile", label: "Perfil", icon: "account_circle" }
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full z-[100] pb-safe-area-inset-bottom">
            {/* Glassmorphic Container associated with the "Island" theme */}
            <div className="bg-white/90 backdrop-blur-xl border-t border-white/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-2 pb-5 flex justify-between items-end relative">

                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    if (item.special) {
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className="relative -top-6 group"
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${isActive
                                        ? 'bg-gradient-to-tr from-secondary-adventure to-orange-500 scale-110 shadow-orange-200'
                                        : 'bg-white text-slate-400 border-2 border-slate-100'
                                    }`}>
                                    <span className={`material-symbols-outlined text-3xl ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-island'}`}>
                                        {item.icon}
                                    </span>
                                </div>
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-wider text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {item.label}
                                </span>
                            </button>
                        );
                    }

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 w-12 ${isActive ? 'text-primary-island -translate-y-1' : 'text-slate-300 hover:text-slate-500'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-2xl ${isActive ? 'filled' : ''}`}>
                                {item.icon}
                            </span>
                            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileBottomNav;
