import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  FlagIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowDownIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

interface ComplaintDetailsProps {
  complaintId?: string;
  onBack?: () => void;
  onNavigateToUser?: (id: string) => void;
  onNavigateToReported?: (id: string, type: string) => void;
  onNavigateToSession?: (id: string) => void;
}

const dummyMessages = [
  { from: 'complainant', text: 'Hello, I want to report an issue.', time: '2024-01-20T10:01:00Z' },
  { from: 'admin', text: 'Thank you for reaching out. Can you provide more details?', time: '2024-01-20T10:02:00Z' },
  { from: 'complainant', text: 'The user was rude during the session.', time: '2024-01-20T10:03:00Z' }
];

const dummyReportedMessages = [
  { from: 'reported', text: 'I was asked to provide a statement.', time: '2024-01-20T10:10:00Z' },
  { from: 'admin', text: 'Please share your side of the story.', time: '2024-01-20T10:11:00Z' }
];

const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({
  complaintId = 'C004',
  onBack,
  onNavigateToUser,
  onNavigateToReported,
  onNavigateToSession
}) => {
  const [showChatModal, setShowChatModal] = useState<null | 'complainant' | 'reported'>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: string]: any[] }>({
    complainant: [...dummyMessages],
    reported: [...dummyReportedMessages]
  });
  const [chatInput, setChatInput] = useState('');
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [statementFrom, setStatementFrom] = useState<'complainant' | 'reported'>('complainant');
  const [statementInput, setStatementInput] = useState('');
  const [showResolutionModal, setShowResolutionModal] = useState<null | 'in-progress' | 'resolved' | 'closed'>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  // Dummy complaint data for misbehaviour type
  const complaint = {
    id: complaintId,
    type: 'misbehaviour',
    complainantType: 'psychologist',
    raisedBy: {
      id: 'U002',
      name: 'Dr. Jane Smith',
      email: 'jane.smith@email.com',
      type: 'psychologist'
    },
    reason: 'Patient was rude during session',
    description:
      'During the session, the patient used inappropriate language and was disrespectful. This made it difficult to continue the session professionally.',
    status: 'open',
    createdAt: '2024-01-21T09:30:00Z',
    updatedAt: '2024-01-21T09:45:00Z',
    reported: {
      id: 'U003',
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      type: 'patient'
    },
    session: {
      sessionId: 'S002',
      sessionDate: '2024-01-21T09:00:00Z',
      status: 'completed'
    },
    evidence: [
      'Chat transcript',
      'Session recording',
      'Admin notes'
    ],
    timeline: [
      {
        date: '2024-01-21T09:30:00Z',
        action: 'Complaint submitted',
        by: 'Dr. Jane Smith'
      },
      {
        date: '2024-01-21T09:35:00Z',
        action: 'Complaint acknowledged',
        by: 'Admin System'
      },
      {
        date: '2024-01-21T09:40:00Z',
        action: 'Asked written statement from reported person',
        by: 'Admin System'
      },
      {
        date: '2024-01-21T09:50:00Z',
        action: 'Asked written statement from psychologist/user',
        by: 'Admin System'
      }
    ],
    statement: {
      from: 'reported',
      details: 'I did not intend to be rude. I apologize for my words.',
      attachment: 'statement_attachment.pdf'
    }
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  // Chat Modal Content
  function ChatModalContent({ person }: { person: 'complainant' | 'reported' }) {
    const messages = chatMessages[person];
    return (
      <>
        <div className="max-h-64 overflow-y-auto mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-3 py-2 text-sm ${msg.from === 'admin' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                <span>{msg.text}</span>
                <div className="text-xs text-gray-500 mt-1">{formatTime(msg.time)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            placeholder="Type your message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (chatInput.trim() !== '') {
                  setChatMessages(prev => ({
                    ...prev,
                    [person]: [
                      ...prev[person],
                      { from: 'admin', text: chatInput, time: new Date().toISOString() }
                    ]
                  }));
                  setChatInput('');
                }
              }
            }}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (chatInput.trim() !== '') {
                setChatMessages(prev => ({
                  ...prev,
                  [person]: [
                    ...prev[person],
                    { from: 'admin', text: chatInput, time: new Date().toISOString() }
                  ]
                }));
                setChatInput('');
              }
            }}
          >
            Send
          </Button>
        </div>
      </>
    );
  }

  // Ask Statement Modal Content
  function AskStatementModalContent() {
    return (
      <>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
            <select
              value={statementFrom}
              onChange={e => setStatementFrom(e.target.value as 'complainant' | 'reported')}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            >
              <option value="complainant">Complainant</option>
              <option value="reported">Reported Person</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Details</label>
            <textarea
              value={statementInput}
              onChange={e => setStatementInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
              rows={3}
              placeholder="Type statement details..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input from Patient</label>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-gray-800 dark:text-gray-200">
              {complaint.statement.details}
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2 flex items-center"
              onClick={() => {
                // Simulate download
                const link = document.createElement('a');
                link.href = '#';
                link.download = complaint.statement.attachment;
                link.click();
              }}
            >
              <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
              Download Attachment
            </Button>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="primary" onClick={() => setShowStatementModal(false)}>
            Send Request
          </Button>
          <Button variant="secondary" onClick={() => setShowStatementModal(false)}>
            Cancel
          </Button>
        </div>
      </>
    );
  }

  // Resolution Modal Content
  function ResolutionModalContent({ type }: { type: 'in-progress' | 'resolved' | 'closed' }) {
    return (
      <>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Internal Note</label>
          <textarea
            value={resolutionNote}
            onChange={e => setResolutionNote(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
            rows={3}
            placeholder="Add internal note..."
          />
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="primary" onClick={() => setShowResolutionModal(null)}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={() => setShowResolutionModal(null)}>
            Cancel
          </Button>
        </div>
      </>
    );
  }

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
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
            {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <FlagIcon className="w-6 h-6 text-red-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Complaint #{complaint.id}</h2>
                <p className="text-gray-600 dark:text-gray-400 capitalize">{complaint.type} Issue</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Complainant Type</h3>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {complaint.complainantType}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Raised By</h3>
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{complaint.raisedBy.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{complaint.raisedBy.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Raised Date</h3>
                <span className="text-xs text-gray-700 dark:text-gray-300">{formatDate(complaint.createdAt)}</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Raised Time</h3>
                <span className="text-xs text-gray-700 dark:text-gray-300">{formatTime(complaint.createdAt)}</span>
              </div>
            </div>
            {/* Reference Section */}
            <div className="mt-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">Reference</h3>
              <Card className="p-4 bg-gray-50 dark:bg-gray-900">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Reported Person</h4>
                  <div className="flex items-center space-x-3">
                    <AcademicCapIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{complaint.reported.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">ID: {complaint.reported.id}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">Type: {complaint.reported.type}</p>
                    </div>
                  </div>
                </div>
                {/* Session Subsection */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Session</h4>
                  <div className="flex items-center space-x-3">
                    <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Session ID: {complaint.session.sessionId}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Date: {formatDate(complaint.session.sessionDate)}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Time: {formatTime(complaint.session.sessionDate)}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">Status: {complaint.session.status}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          {/* Complaint Details */}
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

          {/* Timeline Section */}
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

        {/* Right Side Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full" onClick={() => onNavigateToUser?.(complaint.raisedBy.id)}>
                <UserIcon className="w-4 h-4 mr-2" />
                View Complainant Profile
              </Button>
              <Button variant="primary" className="w-full" onClick={() => onNavigateToReported?.(complaint.reported.id, complaint.reported.type)}>
                <AcademicCapIcon className="w-4 h-4 mr-2" />
                View Reported Person Profile
              </Button>
              <Button variant="primary" className="w-full" onClick={() => onNavigateToSession?.(complaint.session.sessionId)}>
                <CalendarDaysIcon className="w-4 h-4 mr-2" />
                View Session Details
              </Button>
            </div>
          </Card>

          {/* Message Section */}
          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Message</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full flex items-center" onClick={() => { setShowChatModal('complainant'); setChatInput(''); }}>
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                Chat with Complainant
              </Button>
              <Button variant="secondary" className="w-full flex items-center" onClick={() => { setShowChatModal('reported'); setChatInput(''); }}>
                <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                Chat with Reported Person
              </Button>
            </div>
          </Card>

          {/* Ask Statement Section */}
          <Card className="p-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">Ask Statement</h3>
            <Button variant="warning" className="w-full flex items-center" onClick={() => setShowStatementModal(true)}>
              <PencilSquareIcon className="w-4 h-4 mr-2" />
              Ask Statement
            </Button>
          </Card>

          {/* Complaint Info */}
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

          {/* Resolution Actions */}
          {complaint.status !== 'resolved' && complaint.status !== 'closed' && (
            <Card className="p-6">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">Resolution Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="warning"
                  className="w-full flex items-center"
                  onClick={() => setShowResolutionModal('in-progress')}
                >
                  <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                  Mark In Progress
                </Button>
                <Button
                  variant="success"
                  className="w-full flex items-center"
                  onClick={() => setShowResolutionModal('resolved')}
                >
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Mark Resolved
                </Button>
                <Button
                  variant="danger"
                  className="w-full flex items-center"
                  onClick={() => setShowResolutionModal('closed')}
                >
                  <XCircleIcon className="w-4 h-4 mr-2" />
                  Mark Closed
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* MODALS RENDERED OUTSIDE THE GRID */}
      {showChatModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowChatModal(null)}
          title={`Chat with ${showChatModal === 'complainant' ? 'Complainant' : 'Reported Person'}`}
        >
          <ChatModalContent person={showChatModal} />
        </Modal>
      )}
      {showStatementModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowStatementModal(false)}
          title="Ask Statement"
        >
          <AskStatementModalContent />
        </Modal>
      )}
      {showResolutionModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowResolutionModal(null)}
          title={`Mark as ${showResolutionModal.replace('-', ' ')}`}
        >
          <ResolutionModalContent type={showResolutionModal} />
        </Modal>
      )}
    </div>
  );
};

export default ComplaintDetails;