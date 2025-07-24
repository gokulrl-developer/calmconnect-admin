import React, { useState } from 'react';
import { EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

interface ApplicationsProps {
  onViewDetails?: (id: string) => void;
}

interface Application {
  id: number;
  name: string;
  specialization: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  email: string;
  phone: string;
  experience: string;
  qualifications: string[];
  about: string;
}

const Applications: React.FC<ApplicationsProps> = ({ onViewDetails }) => {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Depression',
      appliedDate: '2024-01-15',
      status: 'pending',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      experience: '8 years',
      qualifications: ['PhD in Clinical Psychology', 'Licensed Psychologist', 'CBT Certification'],
      about: 'Experienced clinical psychologist specializing in anxiety and depression treatment with a focus on cognitive-behavioral therapy approaches.'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Trauma & PTSD',
      appliedDate: '2024-01-12',
      status: 'approved',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      experience: '12 years',
      qualifications: ['PhD in Psychology', 'EMDR Certified', 'Trauma Specialist'],
      about: 'Specialized in trauma therapy with extensive experience in EMDR and other evidence-based treatments for PTSD.'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Family Counseling',
      appliedDate: '2024-01-10',
      status: 'pending',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      experience: '6 years',
      qualifications: ['MA in Marriage & Family Therapy', 'Licensed MFT', 'Gottman Method Certified'],
      about: 'Family therapist with expertise in couples counseling and family dynamics, utilizing the Gottman Method and other systemic approaches.'
    }
  ]);

  const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Psychologist Applications</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {applications.filter(app => app.status === 'pending').length} pending applications
          </span>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Name</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Specialization</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Applied Date</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left p-6 text-sm font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr 
                  key={application.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <td className="p-6">
                    <div className="font-medium text-gray-800 dark:text-white">{application.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{application.email}</div>
                  </td>
                  <td className="p-6 text-gray-800 dark:text-white">{application.specialization}</td>
                  <td className="p-6 text-gray-800 dark:text-white">
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewDetails?.(application.id.toString())}
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {application.status === 'pending' && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleStatusChange(application.id, 'approved')}
                          >
                            <CheckIcon className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleStatusChange(application.id, 'rejected')}
                          >
                            <XMarkIcon className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
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

export default Applications;