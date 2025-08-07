const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sprintRoutes = require('./routes/sprintRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Kanban App!');
});

// API routes
app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/sprints', sprintRoutes);

module.exports = app;
