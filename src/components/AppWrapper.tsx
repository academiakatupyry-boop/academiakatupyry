import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import PrototypeNav from './PrototypeNav';

interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    const location = useLocation();

    // Determine if we should show the full nav or specialized UI
    // For now, consistent with previous App.tsx logic
    const showNav = true;

    return (
        <div className="min-h-screen bg-background-light font-body transition-colors duration-500 overflow-x-hidden relative">
            {/* 
               Global Background Layer 
               We can put a subtle pattern here that persists across all pages 
               or dynamic backgrounds based on route.
            */}

            {showNav && <PrototypeNav />}

            {/* Page Content with Transitions */}
            <div className="w-full h-full animate-fade-in-up">
                {children}
            </div>

            {/* Global Footer could go here */}
        </div>
    );
};

export default AppWrapper;
