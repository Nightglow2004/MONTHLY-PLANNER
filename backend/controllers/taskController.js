const Task = require('../models/Task');
const { getMonthDateRange, getOverdueQuery } = require('../utils/dateUtils');

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks by month
const getTasksByMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    const { startDate, endDate } = getMonthDateRange(year, month);

    const tasks = await Task.find({
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks by date
const getTasksByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Bulk create tasks
const createMultipleTasks = async (req, res) => {
  try {
    const tasks = await Task.insertMany(req.body);
    res.status(201).json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Bulk creation failed', errors: error.errors });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get monthly statistics
const getMonthStats = async (req, res) => {
  try {
    const { year, month } = req.params;
    const { startDate, endDate } = getMonthDateRange(year, month);

    const totalTasks = await Task.countDocuments({
      date: { $gte: startDate, $lte: endDate }
    });

    const completedTasks = await Task.countDocuments({
      date: { $gte: startDate, $lte: endDate },
      completed: true
    });

    const overdueTasks = await Task.countDocuments(getOverdueQuery());

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks: totalTasks - completedTasks,
      overdueTasks,
      completionRate:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodayStats = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const totalTasks = await Task.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    const completedTasks = await Task.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay },
      completed: true
    });

    const overdueTasks = await Task.countDocuments({
      date: { $lt: new Date() },
      completed: false
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks: totalTasks - completedTasks,
      overdueTasks,
      completionRate:
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllTasks,
  getTasksByMonth,
  getTasksByDate,
  createTask,
  createMultipleTasks,
  updateTask,
  deleteTask,
  getMonthStats,
  getTodayStats // ✅ Add this
};
