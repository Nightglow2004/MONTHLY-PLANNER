
// frontend/src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
   // { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">Monthly Planner</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
              activeSection === item.id
                ? 'bg-blue-100 border-r-4 border-blue-500 text-blue-700'
                : 'text-gray-600'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
