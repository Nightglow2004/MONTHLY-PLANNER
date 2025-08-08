const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'https://monthly-planner-phi.vercel.app', // Your Vercel frontend URL
}));

app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Monthly Planner API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});