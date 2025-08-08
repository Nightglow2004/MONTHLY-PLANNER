const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  date: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  completed: { type: Boolean, default: false },
  category: { type: String, default: 'general' },
  recurrence: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
}, { timestamps: true });

taskSchema.index({ date: 1 });
taskSchema.index({ completed: 1 });

module.exports = mongoose.model('Task', taskSchema);
