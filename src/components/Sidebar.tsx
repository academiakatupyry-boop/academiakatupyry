import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import SidebarToggle from './SidebarToggle';

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: "/learn", label: "Aprender", icon: "school" },
        // Map removed as requested
        { path: "/board", label: "Jugar", icon: "sports_esports" },
        { path: "/arena", label: "Torneos", icon: "swords" },
        { path: "/market", label: "Tienda", icon: "storefront" },
        { path: "/schools", label: "Escuelas", icon: "domain" }, // Changed icon
        { path: "/profile", label: "Perfil", icon: "person" }
    ];

    return (
        <aside className={`fixed left - 0 top - 0 h - full bg - white border - r - 2 border - slate - 200 flex flex - col z - 50 hidden md:flex font - display transition - all duration - 300 ${collapsed ? 'w-24' : 'w-64'} `}>
            {/* Logo Area */}
            <div
                className="p-6 cursor-pointer flex items-center justify-center hover:opacity-90 transition-opacity"
                onClick={() => navigate('/')}
            >
                <img src="/isologo.png" alt="Katupyry" className={`object - contain drop - shadow - md transition - all ${collapsed ? 'w-12 h-12' : 'w-24 h-24'} `} />
            </div>

            {/* Toggle Switch */}
            <SidebarToggle collapsed={collapsed} onToggle={onToggle} />

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
                                } ${collapsed ? 'justify-center px-0' : ''}`}
                            title={collapsed ? item.label : ''}
                        >
                            <span className={`material-symbols-outlined text-[28px] ${isActive ? "fill-current" : ""}`}>
                                {item.icon}
                            </span>
                            {!collapsed && (
                                <span className={`uppercase font-bold text-sm tracking-widest ${isActive ? "text-primary-island" : "text-slate-500"}`}>
                                    {item.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer / CTA (Bottom) */}
            <div className="p-4 border-t-2 border-slate-100">
                <button
                    onClick={() => navigate('/school-form')}
                    className="w-full bg-secondary-adventure hover:bg-yellow-400 text-primary-island font-black py-3 rounded-xl shadow-btn-secondary active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
                    title="Premium"
                >
                    <span className="material-symbols-outlined">star</span>
                    {!collapsed && <span className="inline">PREMIUM</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
