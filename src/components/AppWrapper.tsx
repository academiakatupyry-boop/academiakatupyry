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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="min-h-screen bg-background-light font-body transition-colors duration-500 flex">
            {/* Sidebar (Desktop) */}
            <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

            {/* Mobile Nav */}
            <div className="md:hidden">
                <PrototypeNav />
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 relative bg-background-light min-h-screen ${isSidebarCollapsed ? 'ml-0 lg:ml-20' : 'ml-0 lg:ml-64'}`}>
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
