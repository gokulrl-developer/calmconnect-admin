import React, { useState } from 'react';
import { BellIcon, UserPlusIcon, FlagIcon, UserMinusIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Sidebar from '../Layout/Sidebar'; // Assuming Sidebar is used in Complaints page
import Header from '../Layout/Header';   // Assuming Header is used in Complaints page

const initialNotifications = [
  {
    id: 1,
    type: 'psychologist-application',
    title: 'New Psychologist Application',
    details: 'Dr. Emily Carter has applied for psychologist registration.',
    time: '2025-07-25 09:30',
    read: false,
  },
  {
    id: 2,
    type: 'new-concern',
    title: 'New Concern Raised',
    details: 'A new concern has been raised by patient John Doe.',
    time: '2025-07-25 10:15',
    read: false,
  },
  {
    id: 3,
    type: 'psychologist-deleted',
    title: 'Psychologist Deleted Account',
    details: 'Dr. Alan Smith has deleted his account.',
    time: '2025-07-24 17:45',
    read: false,
  },
];

const initialPreferences = {
  'psychologist-application': true,
  'new-concern': true,
  'psychologist-deleted': true,
};

const typeIcon = {
  'psychologist-application': <UserPlusIcon className="w-6 h-6 text-blue-500" />,
  'new-concern': <FlagIcon className="w-6 h-6 text-yellow-500" />,
  'psychologist-deleted': <UserMinusIcon className="w-6 h-6 text-red-500" />,
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [preferences, setPreferences] = useState(initialPreferences);

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const togglePreference = (type: string) => {
    setPreferences(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Notifications" icon={<BellIcon className="w-7 h-7 text-blue-600" />} />
        <main className="p-8 space-y-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Notifications</h1>
            <Button variant="primary" onClick={markAllRead}>
              Mark All as Read
            </Button>
          </div>
          <Card className="p-6 space-y-4">
            {notifications.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                No notifications to show.
              </div>
            )}
            {notifications.map(n => (
              <div
                key={n.id}
                className={`flex items-center justify-between rounded-lg px-4 py-3 ${n.read ? 'bg-gray-50 dark:bg-gray-800 opacity-70' : 'bg-white dark:bg-gray-900'} border-b border-gray-200 dark:border-gray-800`}
              >
                <div className="flex items-center space-x-4">
                  {typeIcon[n.type]}
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{n.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{n.details}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{n.time}</div>
                  </div>
                </div>
                {!n.read && (
                  <Button variant="secondary" size="sm" onClick={() => markRead(n.id)}>
                    Mark Read
                  </Button>
                )}
              </div>
            ))}
          </Card>

          <Card className="p-6 mt-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {typeIcon['psychologist-application']}
                  <span className="font-medium text-gray-700 dark:text-gray-300">New Psychologist Application</span>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences['psychologist-application']}
                    onChange={() => togglePreference('psychologist-application')}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{preferences['psychologist-application'] ? 'On' : 'Off'}</span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {typeIcon['new-concern']}
                  <span className="font-medium text-gray-700 dark:text-gray-300">New Concern Raised</span>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences['new-concern']}
                    onChange={() => togglePreference('new-concern')}
                    className="form-checkbox h-5 w-5 text-yellow-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{preferences['new-concern'] ? 'On' : 'Off'}</span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {typeIcon['psychologist-deleted']}
                  <span className="font-medium text-gray-700 dark:text-gray-300">Psychologist Deleted Account</span>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences['psychologist-deleted']}
                    onChange={() => togglePreference('psychologist-deleted')}
                    className="form-checkbox h-5 w-5 text-red-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{preferences['psychologist-deleted'] ? 'On' : 'Off'}</span>
                </label>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Notifications;