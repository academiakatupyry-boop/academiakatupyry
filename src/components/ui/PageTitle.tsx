import React from 'react';

interface PageTitleProps {
    title: string;
    subtitle?: string; // Optional subtitle like "Katupyry" part if split, or just one string
    highlight?: string; // The part to be gradient
    description?: string;
    className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, highlight, description, className = '' }) => {
    return (
        <div className={`mb-12 text-center ${className}`}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight leading-none text-slate-800 drop-shadow-sm mb-4">
                {title}
                {highlight && (
                    <>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 filter drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
                            {highlight}
                        </span>
                    </>
                )}
            </h1>
            {description && (
                <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-3xl mx-auto leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};

export default PageTitle;
