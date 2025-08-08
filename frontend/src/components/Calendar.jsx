// frontend/src/components/Calendar.jsx
import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { getCurrentMonth, getMonthName, getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';

const Calendar = () => {
  const currentMonth = getCurrentMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const { tasks, loading, updateTask } = useTasks(selectedMonth.year, selectedMonth.month);
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = getDaysInMonth(selectedMonth.year, selectedMonth.month);
  const firstDayOfMonth = getFirstDayOfMonth(selectedMonth.year, selectedMonth.month);

  const navigateMonth = (direction) => {
    const newMonth = selectedMonth.month + direction;
    if (newMonth > 12) {
      setSelectedMonth({ year: selectedMonth.year + 1, month: 1 });
    } else if (newMonth < 1) {
      setSelectedMonth({ year: selectedMonth.year - 1, month: 12 });
    } else {
      setSelectedMonth({ ...selectedMonth, month: newMonth });
    }
  };

const getTasksForDay = (day) => {
  const dateStr = `${selectedMonth.year}-${String(selectedMonth.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return tasks.filter(task => {
    const taskDate = new Date(task.date);
    const taskDateStr = `${taskDate.getFullYear()}-${String(taskDate.getMonth() + 1).padStart(2, '0')}-${String(taskDate.getDate()).padStart(2, '0')}`;
    return taskDateStr === dateStr;
  });
}


  const toggleTaskCompletion = async (taskId, currentStatus) => {
    await updateTask(taskId, { completed: !currentStatus });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              ←
            </button>
            <h2 className="text-xl font-semibold text-gray-800 min-w-[200px] text-center">
              {getMonthName(selectedMonth.month)} {selectedMonth.year}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              →
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-700 py-3">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-4">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="h-32"></div>
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const dayTasks = getTasksForDay(day);
              const completedTasks = dayTasks.filter(task => task.completed);
              const isToday = 
                day === new Date().getDate() &&
                selectedMonth.month === new Date().getMonth() + 1 &&
                selectedMonth.year === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={`h-32 border rounded-lg p-2 cursor-pointer transition-all hover:shadow-md ${
                    isToday
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className={`font-semibold mb-2 ${isToday ? 'text-blue-700' : 'text-gray-800'}`}>
                    {day}
                    {isToday && (
                      <span className="ml-1 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                        Today
                      </span>
                    )}
                  </div>
                  
                  {dayTasks.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {dayTasks.length} tasks
                      </div>
                      {completedTasks.length === dayTasks.length && dayTasks.length > 0 ? (
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          All done!
                        </div>
                      ) : (
                        <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          {dayTasks.length - completedTasks.length} pending
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Detail Modal */}
        {selectedDate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {getMonthName(selectedMonth.month)} {selectedDate}, {selectedMonth.year} - Tasks
                  </h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-3">
                  {getTasksForDay(selectedDate).length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No tasks for this day</p>
                  ) : (
                    getTasksForDay(selectedDate).map(task => (
                      <div
                        key={task._id}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task._id, task.completed)}
                          className="mr-3 h-4 w-4 text-blue-600"
                        />
                        <span
                          className={`flex-1 ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {task.priority} priority
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;






