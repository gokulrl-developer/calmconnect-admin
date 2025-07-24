import React from 'react';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CalendarDaysIcon, 
  ExclamationTriangleIcon,
  UserIcon,
  AcademicCapIcon,
  StarIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'applications', label: 'Applications', icon: DocumentTextIcon },
    { id: 'sessions', label: 'Sessions', icon: CalendarDaysIcon },
    { id: 'complaints', label: 'Complaints', icon: ExclamationTriangleIcon },
    { id: 'users', label: 'Users', icon: UserIcon },
    { id: 'psychologists', label: 'Psychologists', icon: AcademicCapIcon },
    { id: 'wallet', label: 'Wallet', icon: StarIcon },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/20 dark:border-gray-600/20 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">CalmConnect</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  currentPage === item.id
                    ? 'bg-gray-500/20 text-gray-700 dark:text-gray-300 shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-500/10 dark:hover:bg-gray-700/20 hover:text-gray-800 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-600/20 transition-all duration-300 group"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;