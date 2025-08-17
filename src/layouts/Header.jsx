import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Header() {
  const { user } = useUser();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r from-primary/15 via-secondary/8 to-primary/15 dark:supports-[backdrop-filter]:bg-gradient-to-r dark:from-primary/25 dark:via-secondary/15 dark:to-primary/25">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Predictive
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-xl text-base font-medium transition-all duration-300 hover:scale-105 ${
                  isActive 
                    ? "gradient-primary text-white shadow-glow font-semibold" 
                    : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-white/60 dark:hover:bg-gray-800/60"
                }`
              }
              end
            >
              Home
            </NavLink>
            {user && (
              <NavLink 
                to={`/${user.id}/profile`} 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-xl text-base font-medium transition-all duration-300 hover:scale-105 ${
                    isActive 
                      ? "gradient-primary text-white shadow-glow font-semibold" 
                      : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-white/60 dark:hover:bg-gray-800/60"
                  }`
                }
              >
                Profile
              </NavLink>
            )}
            {user && (
              <NavLink 
                to={`/${user.id}/info`} 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-xl text-base font-medium transition-all duration-300 hover:scale-105 ${
                    isActive 
                      ? "gradient-primary text-white shadow-glow font-semibold" 
                      : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-white/60 dark:hover:bg-gray-800/60"
                  }`
                }
              >
                Predictor
              </NavLink>
            )}
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-xl text-base font-medium transition-all duration-300 hover:scale-105 ${
                  isActive 
                    ? "gradient-primary text-white shadow-glow font-semibold" 
                    : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-white/60 dark:hover:bg-gray-800/60"
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* Right Side - Auth & Dark Mode */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 group shadow-modern"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <use href="/icons/sprite.svg#sun" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <use href="/icons/sprite.svg#moon" />
                </svg>
              )}
            </button>

            <SignedOut>
              <Link to="/sign-in">
                <Button 
                  variant="ghost" 
                  className="text-base font-medium hover:text-primary transition-all duration-300 hover:scale-105 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button 
                  className="gradient-primary text-white text-base font-medium hover:shadow-glow transition-all duration-300 px-6 py-2"
                >
                  Get Started
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  className="text-base font-medium hover:text-primary transition-all duration-300 hover:scale-105 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80"
                >
                  Dashboard
                </Button>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-xl shadow-modern"
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;