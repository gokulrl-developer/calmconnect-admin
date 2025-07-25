import React from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  AcademicCapIcon,
  WalletIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { FlagIcon } from '@heroicons/react/24/solid'; // <-- Correct import for FlagIcon

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, onLogout }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-40 flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">CalmConnect Admin</span>
      </div>
      <nav className="flex-1 py-6 space-y-2">
        <button
          className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition ${currentPage === 'dashboard' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          <HomeIcon className="w-5 h-5 mr-3" />
          Dashboard
        </button>
        <button
          className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition ${currentPage === 'applications' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : ''}`}
          onClick={() => setCurrentPage('applications')}
        >
          <ClipboardDocumentListIcon className="w-5 h-5 mr-3" />
          Applications
        </button>
        <button
          className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition ${currentPage === 'sessions' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : ''}`}
          onClick={() => setCurrentPage('sessions')}
        >
          <ClipboardDocumentListIcon className="w-5 h-5 mr-3" />
          Sessions
        </button>
        <button
          className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition ${currentPage === 'complaints' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : ''}`}
          onClick={() => setCurrentPage('complaints')}
        >
          <FlagIcon className="w-5 h-5 mr-3 text-yellow-500" /> {/* Use solid FlagIcon */}
          Complaints
        </button>
        <button
          className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition ${currentPage === 'users' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : ''}`}
          onClick={() => setCurrentPage('users')}
        >
          <UserGroupIcon className="w-5 h-5 mr-3" />
          Users
        </button>
        <button
          className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition ${currentPage === 'psychologists' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : ''}`}
          onClick={() => setCurrentPage('psychologists')}
        >
          <AcademicCapIcon className="w-5 h-5 mr-3" />
          Psychologists
        </button>
        <button
          className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition ${currentPage === 'wallet' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : ''}`}
          onClick={() => setCurrentPage('wallet')}
        >
          <WalletIcon className="w-5 h-5 mr-3" />
          Wallet
        </button>
        <button
          className={`w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition ${currentPage === 'notifications' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold' : ''}`}
          onClick={() => setCurrentPage('notifications')}
        >
          <BellIcon className="w-5 h-5 mr-3" />
          Notifications
        </button>
      </nav>
      <div className="p-6 border-t border-gray-200 dark:border-gray-800">
        <button
          className="w-full flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg transition"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;