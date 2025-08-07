const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // I'll create this in the next step

// All these routes are protected
router.use(authMiddleware.protect);

router.route('/')
    .post(taskController.createTask)
    .get(taskController.getAllTasks);

router.route('/:id')
    .get(taskController.getTaskById)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
