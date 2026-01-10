import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    to: string;
    children: React.ReactNode;
    variant?: 'primary' | 'glass';
    icon?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ to, children, variant = 'primary', icon, className = '' }) => {
    const baseClasses = "group h-16 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 transition-all relative overflow-hidden";

    const variants = {
        primary: "bg-gradient-to-b from-yellow-400 to-orange-500 text-white font-black shadow-[0_6px_0_rgb(180,83,9)] hover:shadow-[0_3px_0_rgb(180,83,9)] hover:translate-y-[3px] border-2 border-orange-300 active:shadow-none active:translate-y-[6px]",
        glass: "bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm shadow-sm hover:shadow-lg"
    };

    return (
        <Link to={to} className={`${baseClasses} ${variants[variant]} ${className}`}>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl"></div>
            )}
            {icon && (
                <span className={`material-symbols-outlined text-3xl ${variant === 'glass' ? 'group-hover:rotate-12 transition-transform' : 'filled group-hover:animate-wiggle'}`}>
                    {icon}
                </span>
            )}
            <span className="relative z-10">{children}</span>
        </Link>
    );
};

export default Button;
