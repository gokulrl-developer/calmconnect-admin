import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-64 right-0 h-16 glass-card border-b border-white/20 dark:border-gray-600/20 z-30">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">CalmConnect Admin</h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-card hover:bg-gray-500/10 dark:hover:bg-gray-700/20 transition-all duration-300 group"
          >
            {theme === 'light' ? (
              <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300" />
            ) : (
              <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 transition-colors duration-300" />
            )}
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;