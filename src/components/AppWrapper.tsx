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
    const [collapsed, setCollapsed] = React.useState(false);

    // Pages where we might want full screen (no sidebar)? e.g. Game Board?
    // User requested "Layout que mantenga el Sidebar fijo".
    // Usually Game Board needs full space. Let's keep it consistent for now.

    const sidebarWidthClass = collapsed ? 'md:pl-20' : 'md:pl-64'; // Adjusted manually. Sidebar needs to respect this too.
    // Wait, Sidebar component will have w-20 or w-64. The main content needs the margin.
    // Actually, if collapsed, Sidebar is w-20 (80px). If expanded, w-64 (256px).
    // So logic: collapsed ? 'md:pl-24' : 'lg:pl-64'. 
    // Let's ensure Sidebar handles the width transition.

    return (
        <div className="min-h-screen bg-background-light font-body transition-colors duration-500 flex">
            {/* Sidebar (Desktop) */}
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

            {/* Mobile Nav (Temporary reuse of PrototypeNav or new BottomBar) */}
            <div className="md:hidden">
                <PrototypeNav />
            </div>

            {/* Main Content Area */}
            {/* Sidebar is fixed. We need padding-left equal to its width */}
            <main className={`flex-1 w-full min-h-screen relative transition-all duration-300 ${collapsed ? 'md:pl-24' : 'md:pl-64'}`}>
                <div className="w-full h-full animate-fade-in-up">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AppWrapper;
