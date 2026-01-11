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
            <main className="flex-1 w-full md:pl-20 lg:pl-64 min-h-screen relative">
                <div className="w-full h-full animate-fade-in-up">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AppWrapper;
