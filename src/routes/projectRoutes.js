const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const sprintRoutes = require('./sprintRoutes');
const taskRoutes = require('./taskRoutes');

// All these routes are protected
router.use(authMiddleware.protect);

router.route('/')
    .post(projectController.createProject)
    .get(projectController.getAllProjects);

router.route('/:id')
    .get(projectController.getProjectById)
    .put(projectController.updateProject)
    .delete(projectController.deleteProject);

// Nested routes
router.use('/:projectId/sprints', sprintRoutes);
router.use('/:projectId/tasks', taskRoutes);

module.exports = router;
