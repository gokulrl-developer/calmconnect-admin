import React, { useState } from 'react';
import { ArrowLeftIcon, ClockIcon, UserIcon, AcademicCapIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';

interface SessionDetailsProps {
  sessionId?: string;
  onBack?: () => void;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ sessionId = 'S001', onBack }) => {
  const [session] = useState({
    id: 'S001',
    userId: 'U001',
    userName: 'John Doe',
    userEmail: 'john.doe@email.com',
    psychologistId: 'P001',
    psychologistName: 'Dr. Sarah Johnson',
    psychologistEmail: 'sarah.johnson@email.com',
    scheduledTime: '2024-01-20T10:00:00Z',
    startTime: '2024-01-20T10:02:00Z',
    endTime: '2024-01-20T11:02:00Z',
    duration: 60,
    actualDuration: 60,
    status: 'completed',
    type: 'individual',
    sessionType: 'Video Call',
    notes: 'Patient showed good progress with anxiety management techniques. Discussed coping strategies and assigned homework exercises.',
    rating: 5,
    feedback: 'Very helpful session. Dr. Johnson provided excellent guidance.',
    nextSessionScheduled: '2024-01-27T10:00:00Z',
    sessionGoals: [
      'Discuss anxiety triggers',
      'Practice breathing exercises',
      'Review homework from previous session'
    ],
    outcomes: [
      'Patient identified key anxiety triggers',
      'Successfully practiced breathing techniques',
      'Completed all homework assignments'
    ]
  });

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Sessions
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Session Details</h1>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Session #{session.id}</h2>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <ClockIcon className="w-5 h-5" />
                <span>{session.duration} minutes</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Patient</p>
                    <p className="text-gray-600 dark:text-gray-400">{session.userName}</p>
                    <p className="text-sm text-gray-500">{session.userEmail}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <AcademicCapIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">Psychologist</p>
                    <p className="text-gray-600 dark:text-gray-400">{session.psychologistName}</p>
                    <p className="text-sm text-gray-500">{session.psychologistEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Session Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Scheduled Time</p>
                  <p className="text-gray-600 dark:text-gray-400">{formatDateTime(session.scheduledTime)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ClockIcon className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Start Time</p>
                  <p className="text-gray-600 dark:text-gray-400">{formatDateTime(session.startTime)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ClockIcon className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">End Time</p>
                  <p className="text-gray-600 dark:text-gray-400">{formatDateTime(session.endTime)}</p>
                </div>
              </div>
            </div>
          </Card>

        </div>

        <div className="space-y-6">
          {session.rating && (
            <Card className="p-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">Patient Feedback</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rating</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(session.rating)}</div>
                    <span className="text-gray-600 dark:text-gray-400">({session.rating}/5)</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Feedback</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {session.feedback}
                  </p>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default SessionDetails;