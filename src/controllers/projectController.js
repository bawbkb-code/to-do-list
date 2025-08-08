const Project = require('../models/Project');
const UserProject = require('../models/UserProject');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id;

        if (!name) {
            return res.status(400).json({ message: 'Project name is required' });
        }

        const project = await Project.create({ name, description });

        // Add the creating user as the owner of the project
        await UserProject.create({
            UserId: userId,
            ProjectId: project.id,
            role: 'owner',
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error: error.message });
    }
};

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
exports.getAllProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await req.user.getProjects();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error: error.message });
    }
};

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // TODO: Check if the user is a member of the project before returning it
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project', error: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
    // TODO: Implement this, and check for owner/admin role
    res.status(501).json({ message: 'Not implemented' });
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
    // TODO: Implement this, and check for owner role
    res.status(501).json({ message: 'Not implemented' });
};
