import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: "/learn", label: "Aprender", icon: "school" },
        { path: "/map", label: "Mapa", icon: "map" }, // Keeping Map for now as legacy or alternative
        { path: "/board", label: "Jugar", icon: "sports_esports" },
        { path: "/arena", label: "Torneos", icon: "swords" },
        { path: "/market", label: "Tienda", icon: "storefront" },
        { path: "/schools", label: "Escuelas", icon: "domain" }, // Changed icon
        { path: "/profile", label: "Perfil", icon: "person" }
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-white border-r-2 border-slate-200 flex flex-col z-50 hidden md:flex font-display">
            {/* Logo Area */}
            <div
                className="p-6 cursor-pointer flex items-center justify-center hover:opacity-90 transition-opacity"
                onClick={() => navigate('/')}
            >
                <img src="/isologo.png" alt="Katupyry" className="w-20 h-20 lg:w-24 lg:h-24 object-contain drop-shadow-md" />
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-2 lg:px-4 space-y-2 py-4 overflow-y-auto">
                {menuItems.map(item => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 border-2 border-transparent ${isActive
                                ? "bg-blue-100/50 border-blue-200 text-primary-island"
                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                }`}
                        >
                            <span className={`material-symbols-outlined text-[28px] ${isActive ? "fill-current" : ""}`}>
                                {item.icon}
                            </span>
                            <span className={`uppercase font-bold text-sm tracking-widest hidden lg:block ${isActive ? "text-primary-island" : "text-slate-500"}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer / CTA (Bottom) */}
            <div className="p-4 border-t-2 border-slate-100">
                <button
                    onClick={() => navigate('/school-form')}
                    className="w-full bg-secondary-adventure hover:bg-yellow-400 text-primary-island font-black py-3 rounded-xl shadow-btn-secondary active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined">star</span>
                    <span className="hidden lg:inline">PREMIUM</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
