const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

// @desc    Create a new sprint
// @route   POST /api/projects/:projectId/sprints
// @access  Private
exports.createSprint = async (req, res) => {
    try {
        const { name, startDate, endDate } = req.body;
        const { projectId } = req.params;

        if (!name || !startDate || !endDate) {
            return res.status(400).json({ message: 'Please provide name, start date, and end date' });
        }

        const sprint = await Sprint.create({ name, startDate, endDate, ProjectId: projectId });
        res.status(201).json(sprint);
    } catch (error) {
        res.status(500).json({ message: 'Error creating sprint', error: error.message });
    }
};

// @desc    Get all sprints for a project
// @route   GET /api/projects/:projectId/sprints
// @access  Private
exports.getAllSprints = async (req, res) => {
    try {
        const { projectId } = req.params;
        const sprints = await Sprint.findAll({ where: { ProjectId: projectId }, include: Task });
        res.status(200).json(sprints);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sprints', error: error.message });
    }
};

// @desc    Get a single sprint
// @route   GET /api/projects/:projectId/sprints/:id
// @access  Private
exports.getSprintById = async (req, res) => {
    try {
        const { id, projectId } = req.params;
        const sprint = await Sprint.findOne({ where: { id, ProjectId: projectId }, include: Task });

        if (!sprint) {
            return res.status(404).json({ message: 'Sprint not found' });
        }

        res.status(200).json(sprint);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sprint', error: error.message });
    }
};

// @desc    Update a sprint
// @route   PUT /api/projects/:projectId/sprints/:id
// @access  Private
exports.updateSprint = async (req, res) => {
    try {
        const { id, projectId } = req.params;
        const { name, startDate, endDate } = req.body;

        const sprint = await Sprint.findOne({ where: { id, ProjectId: projectId } });

        if (!sprint) {
            return res.status(404).json({ message: 'Sprint not found' });
        }

        sprint.name = name || sprint.name;
        sprint.startDate = startDate || sprint.startDate;
        sprint.endDate = endDate || sprint.endDate;
        await sprint.save();

        res.status(200).json(sprint);
    } catch (error) {
        res.status(500).json({ message: 'Error updating sprint', error: error.message });
    }
};

// @desc    Delete a sprint
// @route   DELETE /api/projects/:projectId/sprints/:id
// @access  Private
exports.deleteSprint = async (req, res) => {
    try {
        const { id, projectId } = req.params;
        const sprint = await Sprint.findOne({ where: { id, ProjectId: projectId } });

        if (!sprint) {
            return res.status(404).json({ message: 'Sprint not found' });
        }

        await sprint.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting sprint', error: error.message });
    }
};
