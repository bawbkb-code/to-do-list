const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
    try {
        const { content, status } = req.body;
        const userId = req.user.id; // This will come from the auth middleware

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const task = await Task.create({
            content,
            status,
            UserId: userId
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.findAll({ where: { UserId: userId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

// @desc    Get a single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await Task.findOne({ where: { id, UserId: userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, status } = req.body;
        const userId = req.user.id;

        const task = await Task.findOne({ where: { id, UserId: userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.content = content || task.content;
        task.status = status || task.status;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const task = await Task.findOne({ where: { id, UserId: userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};
