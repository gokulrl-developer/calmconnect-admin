import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './hooks/useAuth';
import Login from './components/Pages/Login';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Pages/Dashboard';
import Applications from './components/Pages/Applications';
import Sessions from './components/Pages/Sessions';
import Complaints from './components/Pages/Complaints';
import Users from './components/Pages/Users';
import Psychologists from './components/Pages/Psychologists';
import Wallet from './components/Pages/Wallet';
import ApplicationDetails from './components/Pages/ApplicationDetails';
import SessionDetails from './components/Pages/SessionDetails';
import ComplaintDetails from './components/Pages/ComplaintDetails';
import UserDetails from './components/Pages/UserDetails';
import PsychologistDetails from './components/Pages/PsychologistDetails';
import Notifications from './components/Pages/Notifications';

const App: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Fix: Always render Sidebar and Header, and always call renderPage()
  // No conditional rendering for Notifications page

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'applications':
        return <Applications onViewDetails={(id) => { setSelectedId(id); setCurrentPage('application-details'); }} />;
      case 'sessions':
        return <Sessions onViewDetails={(id) => { setSelectedId(id); setCurrentPage('session-details'); }} />;
      case 'complaints':
        return <Complaints onViewDetails={(id) => { setSelectedId(id); setCurrentPage('complaint-details'); }} />;
      case 'users':
        return <Users onViewDetails={(id) => { setSelectedId(id); setCurrentPage('user-details'); }} />;
      case 'psychologists':
        return <Psychologists onViewDetails={(id) => { setSelectedId(id); setCurrentPage('psychologist-details'); }} />;
      case 'wallet':
        return <Wallet />;
      case 'notifications':
        return <Notifications />;
      case 'application-details':
        return <ApplicationDetails applicationId={selectedId} onBack={() => setCurrentPage('applications')} />;
      case 'session-details':
        return <SessionDetails sessionId={selectedId} onBack={() => setCurrentPage('sessions')} />;
      case 'complaint-details':
        return (
          <ComplaintDetails
            complaintId={selectedId}
            onBack={() => setCurrentPage('complaints')}
            onNavigateToUser={(id) => { setSelectedId(id); setCurrentPage('user-details'); }}
            onNavigateToReported={(id, type) => { setSelectedId(id); setCurrentPage(type === 'psychologist' ? 'psychologist-details' : 'user-details'); }}
            onNavigateToSession={(id) => { setSelectedId(id); setCurrentPage('session-details'); }}
          />
        );
      case 'user-details':
        return <UserDetails userId={selectedId} onBack={() => setCurrentPage('users')} />;
      case 'psychologist-details':
        return <PsychologistDetails psychologistId={selectedId} onBack={() => setCurrentPage('psychologists')} />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <Login onLogin={login} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLogout={logout}
        />
        <Header />
        <main className="ml-64 pt-16 p-6">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;