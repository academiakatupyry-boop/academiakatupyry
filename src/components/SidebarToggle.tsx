import React from 'react';
import './SidebarToggle.css';

interface SidebarToggleProps {
    collapsed: boolean;
    onToggle: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ collapsed, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="w-10 h-10 bg-white border-2 border-slate-100 rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-primary-island hover:border-primary-island transition-all"
            title={collapsed ? "Expandir menú" : "Contraer menú"}
        >
            <span className="material-symbols-outlined text-2xl">
                {collapsed ? 'chevron_right' : 'chevron_left'}
            </span>
        </button>
    );
}

export default SidebarToggle;
