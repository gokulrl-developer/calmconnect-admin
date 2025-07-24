import React, { useState } from 'react';
import { EyeIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

interface SessionsProps {
  onViewDetails?: (id: string) => void;
}

interface Session {
  id: string;
  userId: string;
  userName: string;
  psychologistId: string;
  psychologistName: string;
  scheduledTime: string;
  startTime: string;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'individual' | 'group';
  notes?: string;
}

const Sessions: React.FC<SessionsProps> = ({ onViewDetails }) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessions] = useState<Session[]>([
    {
      id: 'S001',
      userId: 'U001',
      userName: 'John Doe',
      psychologistId: 'P001',
      psychologistName: 'Dr. Sarah Johnson',
      scheduledTime: '2024-01-20T10:00:00Z',
      startTime: '2024-01-20T10:02:00Z',
      duration: 60,
      status: 'completed',
      type: 'individual',
      notes: 'Patient showed good progress with anxiety management techniques.'
    },
    {
      id: 'S002',
      userId: 'U002',
      userName: 'Jane Smith',
      psychologistId: 'P002',
      psychologistName: 'Dr. Michael Chen',
      scheduledTime: '2024-01-20T14:00:00Z',
      startTime: '2024-01-20T14:00:00Z',
      duration: 45,
      status: 'in-progress',
      type: 'individual'
    },
    {
      id: 'S003',
      userId: 'U003',
      userName: 'Robert Wilson',
      psychologistId: 'P003',
      psychologistName: 'Dr. Emily Rodriguez',
      scheduledTime: '2024-01-21T09:00:00Z',
      startTime: '',
      duration: 60,
      status: 'scheduled',
      type: 'individual'
    },
    {
      id: 'S004',
      userId: 'U004',
      userName: 'Lisa Johnson',
      psychologistId: 'P001',
      psychologistName: 'Dr. Sarah Johnson',
      scheduledTime: '2024-01-19T16:00:00Z',
      startTime: '',
      duration: 60,
      status: 'cancelled',
      type: 'individual'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Session Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {sessions.filter(s => s.status === 'scheduled').length} scheduled sessions
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['scheduled', 'in-progress', 'completed', 'cancelled'].map((status) => (
          <Card key={status} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{status.replace('-', ' ')}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {sessions.filter(s => s.status === status).length}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[0]}`}></div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Session ID</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">User</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Psychologist</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled Time</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Duration</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr 
                  key={session.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <td className="p-6">
                    <button 
                      onClick={() => setSelectedSession(session)}
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {session.id}
                    </button>
                  </td>
                  <td className="p-6">
                    <button 
                      onClick={() => setSelectedSession(session)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {session.userName}
                    </button>
                  </td>
                  <td className="p-6">
                    <button 
                      onClick={() => setSelectedSession(session)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {session.psychologistName}
                    </button>
                  </td>
                  <td className="p-6 text-gray-800 dark:text-white">
                    {formatDateTime(session.scheduledTime)}
                  </td>
                  <td className="p-6 text-gray-800 dark:text-white">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
                      {session.duration} min
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td className="p-6">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onViewDetails?.(session.id)}
                    >
                      <EyeIcon className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};

export default Sessions;