import React, { useState } from 'react';
import { ArrowLeftIcon, UserIcon, AcademicCapIcon, CalendarDaysIcon, FlagIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';

interface ComplaintDetailsProps {
  complaintId?: string;
  onBack?: () => void;
  onNavigateToUser?: (id: string) => void;
  onNavigateToAgainst?: (id: string, type: string) => void;
  onNavigateToSession?: (id: string) => void;
}

const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({ 
  complaintId = 'C001', 
  onBack, 
  onNavigateToUser, 
  onNavigateToAgainst, 
  onNavigateToSession 
}) => {
  const [complaint] = useState({
    id: 'C001',
    type: 'technical',
    raisedBy: {
      id: 'U001',
      name: 'John Doe',
      email: 'john.doe@email.com'
    },
    against: {
      id: 'P001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@email.com',
      type: 'psychologist'
    },
    sessionId: 'S001',
    sessionDate: '2024-01-20T10:00:00Z',
    reason: 'Audio quality issues during session',
    description: 'During my therapy session, I experienced significant audio quality issues that made it difficult to communicate effectively with Dr. Johnson. The audio kept cutting out and there was a lot of static noise. This disrupted the flow of our conversation and made it hard to focus on the therapy. I had to ask her to repeat herself multiple times, which was frustrating for both of us.',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
    adminNotes: '',
    evidence: [
      'Screenshot of audio settings',
      'Session recording (first 5 minutes)',
      'Network connectivity report'
    ],
    timeline: [
      {
        date: '2024-01-20T10:00:00Z',
        action: 'Complaint submitted',
        by: 'John Doe'
      },
      {
        date: '2024-01-20T10:15:00Z',
        action: 'Complaint acknowledged',
        by: 'Admin System'
      }
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const navigateToUserProfile = () => {
    console.log('Navigate to user profile:', complaint.raisedBy.id);
    onNavigateToUser?.(complaint.raisedBy.id);
  };

  const navigateToAgainstProfile = () => {
    console.log('Navigate to profile:', complaint.against.id);
    onNavigateToAgainst?.(complaint.against.id, complaint.against.type);
  };

  const navigateToSession = () => {
    console.log('Navigate to session:', complaint.sessionId);
    onNavigateToSession?.(complaint.sessionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Complaints
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Complaint Details</h1>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
            {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
            {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FlagIcon className="w-6 h-6 text-red-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Complaint #{complaint.id}</h2>
                <p className="text-gray-600 dark:text-gray-400 capitalize">{complaint.type} Issue</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">Raised By</h3>
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{complaint.raisedBy.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{complaint.raisedBy.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">Against</h3>
                <div className="flex items-center space-x-3">
                  <AcademicCapIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{complaint.against.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{complaint.against.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Complaint Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reason</p>
                <p className="text-gray-800 dark:text-white font-medium">{complaint.reason}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Description</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  {complaint.description}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Related Session</h3>
            <div className="flex items-center justify-between p-4 glass-card rounded-lg">
              <div className="flex items-center space-x-3">
                <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Session #{complaint.sessionId}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{formatDateTime(complaint.sessionDate)}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={navigateToSession}>
                View Session
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Timeline</h3>
            <div className="space-y-4">
              {complaint.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-800 dark:text-white font-medium">{event.action}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">by {event.by}</p>
                    <p className="text-xs text-gray-500">{formatDateTime(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full" onClick={navigateToUserProfile}>
                <UserIcon className="w-4 h-4 mr-2" />
                View Complainant Profile
              </Button>
              <Button variant="primary" className="w-full" onClick={navigateToAgainstProfile}>
                <AcademicCapIcon className="w-4 h-4 mr-2" />
                View {complaint.against.type === 'psychologist' ? 'Psychologist' : 'User'} Profile
              </Button>
              <Button variant="primary" className="w-full" onClick={navigateToSession}>
                <CalendarDaysIcon className="w-4 h-4 mr-2" />
                View Related Session
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Complaint Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                <p className="text-gray-800 dark:text-white">{formatDateTime(complaint.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                <p className="text-gray-800 dark:text-white">{formatDateTime(complaint.updatedAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                <p className="text-gray-800 dark:text-white capitalize">{complaint.type}</p>
              </div>
            </div>
          </Card>

          {complaint.status !== 'resolved' && complaint.status !== 'closed' && (
            <Card className="p-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">Resolution Actions</h3>
              <div className="space-y-3">
                <Button variant="warning" className="w-full">
                  Mark In Progress
                </Button>
                <Button variant="success" className="w-full">
                  Mark Resolved
                </Button>
                <Button variant="danger" className="w-full">
                  Close Complaint
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;