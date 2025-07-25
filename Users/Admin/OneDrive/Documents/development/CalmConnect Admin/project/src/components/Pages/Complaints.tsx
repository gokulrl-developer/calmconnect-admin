import React, { useState } from 'react';
import { EyeIcon, CheckIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

interface ComplaintsProps {
  onViewDetails?: (id: string) => void;
}

type ComplaintType = 'misbehaviour' | 'technical' | 'payment related' | 'others';
type ComplainantType = 'psychologist' | 'patient';

interface Complaint {
  id: string;
  type: ComplaintType;
  raisedBy: string;
  complainantType: ComplainantType;
  reason: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

const Complaints: React.FC<ComplaintsProps> = ({ onViewDetails }) => {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 'C001',
      type: 'technical',
      raisedBy: 'John Doe',
      complainantType: 'patient',
      reason: 'Audio quality issues during session',
      status: 'open',
      createdAt: '2024-01-20T10:00:00Z'
    },
    {
      id: 'C002',
      type: 'misbehaviour',
      raisedBy: 'Jane Smith',
      complainantType: 'psychologist',
      reason: 'Patient was rude during session',
      status: 'in-progress',
      createdAt: '2024-01-19T14:30:00Z'
    },
    {
      id: 'C003',
      type: 'payment related',
      raisedBy: 'Robert Wilson',
      complainantType: 'patient',
      reason: 'Charged twice for the same session',
      status: 'resolved',
      createdAt: '2024-01-18T09:15:00Z',
      resolvedAt: '2024-01-19T16:00:00Z',
      resolution: 'Duplicate charge refunded to user account'
    }
  ]);

  const handleResolve = (complaintId: string, resolution: string) => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === complaintId 
          ? { 
              ...complaint, 
              status: 'resolved' as const,
              resolvedAt: new Date().toISOString(),
              resolution 
            }
          : complaint
      )
    );
    setSelectedComplaint(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const statusMatch = filterStatus === 'all' || complaint.status === filterStatus;
    return statusMatch;
  });

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { dateStr, timeStr };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Complaints Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {complaints.filter(c => c.status === 'open').length} open complaints
          </span>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg glass-card border border-white/20 dark:border-gray-600/20 text-sm text-gray-800 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Complaint ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Raised By</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Complainant Type</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Raised Time</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => {
                const { dateStr, timeStr } = formatDateTime(complaint.createdAt);
                return (
                  <tr 
                    key={complaint.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <td className="p-4">
                      <button 
                        onClick={() => setSelectedComplaint(complaint)}
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {complaint.id}
                      </button>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {complaint.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-800 dark:text-white">{complaint.raisedBy}</td>
                    <td className="p-4 text-gray-800 dark:text-white capitalize">{complaint.complainantType}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-700 dark:text-gray-300">{dateStr}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{timeStr}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewDetails?.(complaint.id)}
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};

export default Complaints;