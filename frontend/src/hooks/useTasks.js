import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';

export const useTasks = (year, month) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [todayStats, setTodayStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const [taskRes, statRes, todayRes] = await Promise.all([
        taskAPI.getTasksByMonth(year, month),
        taskAPI.getMonthStats(year, month),
        taskAPI.getTodayStats()
      ]);
      setTasks(taskRes.data);
      setStats(statRes.data);
      setTodayStats(todayRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [year, month]);

  return {
    tasks,
    stats,
    todayStats,
    loading,
    error,
    addTask: async (data) => {
      await taskAPI.createTask(data);
      fetchTasks();
    },
    updateTask: async (id, data) => {
      await taskAPI.updateTask(id, data);
      fetchTasks();
    },
    deleteTask: async (id) => {
      await taskAPI.deleteTask(id);
      fetchTasks();
    }
  };
};
