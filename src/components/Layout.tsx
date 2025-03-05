
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Home, Library, User, Search, Headphones } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={22} /> },
    { name: 'Search', path: '/search', icon: <Search size={22} /> },
    { name: 'Library', path: '/library', icon: <Library size={22} /> },
    { name: 'Profile', path: '/profile', icon: <User size={22} /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="page-transition">
          {children}
        </div>
      </main>
      
      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass">
        <div className="max-w-lg mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center px-4 py-2 transition-all duration-300",
                  isActive(item.path)
                    ? "text-music-accent"
                    : "text-music-muted hover:text-music-text"
                )}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
