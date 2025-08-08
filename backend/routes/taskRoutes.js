const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTasksByMonth,
  getTasksByDate,
  createTask,
  updateTask,
  deleteTask,
  getMonthStats,
  createMultipleTasks,
  getTodayStats 
} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.get('/month/:year/:month', getTasksByMonth);
router.get('/date/:date', getTasksByDate);
router.get('/stats/:year/:month', getMonthStats);
router.post('/', createTask);
router.post('/bulk', createMultipleTasks); // 🆕
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/stats/today', getTodayStats);


module.exports = router;
