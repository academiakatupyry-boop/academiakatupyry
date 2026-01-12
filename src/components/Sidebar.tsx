import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import SidebarToggle from './SidebarToggle';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    // Local state removed, using props

    const navItems = [
        { path: '/schools', label: 'ESCUELAS', icon: 'domain' }, // Schools first
        { path: '/learn', label: 'APRENDER', icon: 'school' },
        { path: '/fundamentals', label: 'FUNDAMENTOS', icon: 'menu_book' }, // Fundamentals below Learn
        { path: '/board', label: 'JUGAR', icon: 'sports_esports' },
        { path: '/arena', label: 'TORNEOS', icon: 'swords' },
        { path: '/market', label: 'TIENDA', icon: 'store' },
        { path: '/profile', label: 'PERFIL', icon: 'person' },
    ];

    return (
        <aside className={`hidden md:flex fixed left-0 top-0 h-full bg-white border-r-2 border-slate-100 shadow-xl z-50 transition-all duration-300 flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>

            {/* Toggle Button */}
            <div className="absolute -right-4 top-8 z-50">
                <SidebarToggle
                    collapsed={isCollapsed}
                    onToggle={toggleSidebar}
                />
            </div>

            {/* Logo / Header */}
            <div className={`flex items-center justify-center border-b-2 border-slate-100 ${isCollapsed ? 'p-2 h-20' : 'p-6 h-40'}`}>
                {/* Logo - Adjusted for size */}
                <div className="flex items-center justify-center w-full h-full">
                    <img
                        src="/isologosvg.svg"
                        alt="Logo"
                        className={`object-contain hover:scale-110 transition-transform cursor-pointer ${isCollapsed ? 'w-16 h-16' : 'w-48 h-48 drop-shadow-xl'}`}
                        onClick={() => navigate('/')}
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2 no-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group font-black tracking-wide text-sm ${isActive
                                ? 'bg-blue-50 text-primary-island shadow-sm translate-x-1'
                                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600 hover:translate-x-1'
                            }`
                        }
                    >
                        <span className={`material-symbols-outlined text-2xl transition-transform group-hover:scale-110 ${isCollapsed ? 'mx-auto' : ''}`}>
                            {item.icon}
                        </span>
                        {!isCollapsed && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Footer / CTA (Bottom) */}
            <div className="p-4 border-t-2 border-slate-100">
                {!isCollapsed ? (
                    <Link to="/schools" className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black py-4 px-4 rounded-2xl shadow-lg hover:scale-105 transition-transform group relative overflow-hidden text-center">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="material-symbols-outlined relative z-10 text-2xl animate-bounce-slow">domain</span>
                        <span className="relative z-10 text-sm tracking-wide uppercase">Katupyry en mi Escuela</span>
                    </Link>
                ) : (
                    <Link to="/schools" className="flex items-center justify-center w-full aspect-square bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-2xl">domain</span>
                    </Link>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
