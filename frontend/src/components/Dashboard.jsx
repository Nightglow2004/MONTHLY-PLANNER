// frontend/src/components/Dashboard.jsx
import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { getCurrentMonth, getMonthName, formatDate } from "../utils/dateUtils";

const Dashboard = () => {
  const { year, month } = getCurrentMonth();
  const { stats, todayStats, loading, addTask } = useTasks(year, month);
  const [newTask, setNewTask] = useState({
    title: "",
    date: formatDate(new Date()),
    priority: "medium",
  });

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    await addTask(newTask);
    setNewTask({ title: "", date: formatDate(new Date()), priority: "medium" });
    setNewTask({ title: "", date: formatDate(new Date()), priority: "medium" });
  };
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            {getMonthName(month)} {year} Overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayStats.totalTasks || 0}
                </p>
                <p className="text-xs text-gray-500">Tasks</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completedTasks}
                </p>
                <p className="text-xs text-gray-500">Tasks</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-teal-100">
                <span className="text-2xl">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingTasks}
                </p>
                <p className="text-xs text-gray-500">Tasks</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <span className="text-2xl">🚨</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.overdueTasks}
                </p>
                <p className="text-xs text-gray-500">Task</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stats Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Stats</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <svg
                  className="w-48 h-48 transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${
                      (stats.completedTasks / stats.totalTasks) * 251.2
                    } 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.completionRate}%
                    </div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
            </div>
          </div>

          {/* Add New Task */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add New Task
              </h3>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Enter task title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newTask.date}
                  onChange={(e) =>
                    setNewTask({ ...newTask, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>

        {/* Mini Calendar Preview */}
        {/*    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Calendar</h3>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-medium text-gray-600 py-2">{day}</div>
            ))}
            
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
              const dayTasks = tasks.filter(task => 
                new Date(task.date).getDate() === day
              );
              
              return (
                <div
                  key={day}
                  className="aspect-square border border-gray-200 rounded-lg p-1 text-xs hover:bg-gray-50 cursor-pointer"
                >
                  <div className="font-medium text-gray-800">{day}</div>
                  {dayTasks.length > 0 && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default Dashboard;
