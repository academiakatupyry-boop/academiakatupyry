import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import PrototypeNav from './PrototypeNav'; // Keeping for mobile for now? Or replacing entire navigation strategy.
// Actually, let's keep PrototypeNav as "MobileNav" if screen is small, or hide it.
// For this step, I will implement Sidebar for desktop and a simple bottom bar or keep PrototypeNav for mobile.
// Let's use Sidebar (desktop) + PrototypeNav (mobile, tweaked).

interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const location = useLocation();

    // Pages where we might want full screen (no sidebar)? e.g. Game Board?
    // User requested "Layout que mantenga el Sidebar fijo".
    // Usually Game Board needs full space. Let's keep it consistent for now.

    return (
        <div className="min-h-screen bg-background-light font-body transition-colors duration-500 flex">
            {/* Sidebar (Desktop) */}
            <Sidebar />

            {/* Mobile Nav (Temporary reuse of PrototypeNav or new BottomBar) */}
            <div className="md:hidden">
                <PrototypeNav />
            </div>

            {/* Main Content Area */}
            {/* Add margin-left to accommodate fixed sidebar on desktop */}
            {/* Sidebar is w-20 (80px) or w-64 (256px) */}
            <div className="flex-1 ml-0 lg:ml-64 relative bg-background-light min-h-screen">
                {/* Global Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none fixed" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>

                <div className="max-w-7xl mx-auto p-4 lg:p-8 relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AppWrapper;
