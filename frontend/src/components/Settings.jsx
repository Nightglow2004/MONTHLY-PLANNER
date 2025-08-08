// frontend/src/components/Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    defaultPriority: 'medium',
    weekStartsOn: 'sunday',
    dateFormat: 'MM/DD/YYYY'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    // Here you would typically save to localStorage or backend
    localStorage.setItem('plannerSettings', JSON.stringify({
      ...settings,
      [key]: value
    }));
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Customize your planner experience</p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Appearance</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Calendar Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Calendar</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Week Starts On
                </label>
                <select
                  value={settings.weekStartsOn}
                  onChange={(e) => handleSettingChange('weekStartsOn', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                </select>
              </div>
            </div>
          </div>

          {/* Task Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Priority
                </label>
                <select
                  value={settings.defaultPriority}
                  onChange={(e) => handleSettingChange('defaultPriority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                  Enable notifications for due tasks
                </label>
              </div>
            </div>
          </div>

            {/* Save Settings Button */}
            <div className="mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Save Settings
              </button>
            </div>
            
          {/* About */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Monthly Planner</strong> v1.0.0</p>
              <p>A simple and efficient monthly task planner built with MERN stack.</p>
              <p>© 2025 Monthly Planner. Made with ❤️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

