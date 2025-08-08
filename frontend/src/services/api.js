// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  getAllTasks: () => api.get('/tasks'),
  getTasksByMonth: (year, month) => api.get(`/tasks/month/${year}/${month}`),
  getTasksByDate: (date) => api.get(`/tasks/date/${date}`),
  getMonthStats: (year, month) => api.get(`/tasks/stats/${year}/${month}`),
  createTask: (task) => api.post('/tasks', task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  getTodayStats: () => api.get('/tasks/stats/today'),
};

export default api;



