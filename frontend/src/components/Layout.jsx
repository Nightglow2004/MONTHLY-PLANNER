// frontend/src/components/Layout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Calendar from './Calendar';
import Tasks from './Tasks';
import Settings from './Settings';

const Layout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <Calendar />;
      case 'tasks':
        return <Tasks />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderContent()}
    </div>
  );
};

export default Layout;