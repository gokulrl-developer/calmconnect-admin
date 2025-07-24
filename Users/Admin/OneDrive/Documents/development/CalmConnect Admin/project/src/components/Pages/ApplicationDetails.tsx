import React, { useState } from 'react';
import { ArrowLeftIcon, CheckIcon, XMarkIcon, UserIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';

interface ApplicationDetailsProps {
  applicationId?: string;
  onBack?: () => void;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({ applicationId = 'A001', onBack }) => {
  const [application] = useState({
    id: 'A001',
    name: 'Dr. Sarah Johnson',
    specialization: 'Anxiety & Depression',
    appliedDate: '2024-01-15',
    status: 'pending',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    experience: '8 years',
    qualifications: ['PhD in Clinical Psychology', 'Licensed Psychologist', 'CBT Certification'],
    about: 'Experienced clinical psychologist specializing in anxiety and depression treatment with a focus on cognitive-behavioral therapy approaches. I have worked with diverse populations and have extensive experience in both individual and group therapy settings.',
    education: [
      { degree: 'PhD in Clinical Psychology', institution: 'Stanford University', year: '2015' },
      { degree: 'MA in Psychology', institution: 'UC Berkeley', year: '2012' },
      { degree: 'BA in Psychology', institution: 'UCLA', year: '2010' }
    ],
    workHistory: [
      { position: 'Senior Clinical Psychologist', company: 'Mental Health Center', duration: '2018-Present' },
      { position: 'Clinical Psychologist', company: 'Community Health Services', duration: '2015-2018' }
    ],
    references: [
      { name: 'Dr. Michael Thompson', position: 'Director of Psychology', contact: 'mthompson@mhc.org' },
      { name: 'Dr. Lisa Chen', position: 'Senior Psychologist', contact: 'lchen@chs.org' }
    ]
  });

  const handleApprove = () => {
    console.log('Approving application:', application.id);
    // Implementation for approval
  };

  const handleReject = () => {
    console.log('Rejecting application:', application.id);
    // Implementation for rejection
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Application Details</h1>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center">
                <AcademicCapIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{application.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{application.specialization}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Applied on {new Date(application.appliedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Email:</span> {application.email}</p>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Phone:</span> {application.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">Professional Info</h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Experience:</span> {application.experience}</p>
                  <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Specialization:</span> {application.specialization}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">About</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{application.about}</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Education and Certifications</h3>
            <div className="space-y-4">
              {application.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <h4 className="font-medium text-gray-800 dark:text-white">{edu.degree}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Work History</h3>
            <div className="space-y-4">
              {application.workHistory.map((work, index) => (
                <div key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <h4 className="font-medium text-gray-800 dark:text-white">{work.position}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{work.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{work.duration}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Qualifications</h3>
            <div className="space-y-2">
              {application.qualifications.map((qualification, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{qualification}</span>
                </div>
              ))}
            </div>
          </Card>

          {application.status === 'pending' && (
            <Card className="p-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <Button variant="success" className="w-full" onClick={handleApprove}>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Approve Application
                </Button>
                <Button variant="danger" className="w-full" onClick={handleReject}>
                  <XMarkIcon className="w-4 h-4 mr-2" />
                  Reject Application
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;