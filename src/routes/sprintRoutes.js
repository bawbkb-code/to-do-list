const express = require('express');
const router = express.Router();
const sprintController = require('../controllers/sprintController');
const authMiddleware = require('../middleware/authMiddleware');

// All these routes are protected
router.use(authMiddleware.protect);

router.route('/')
    .post(sprintController.createSprint)
    .get(sprintController.getAllSprints);

router.route('/:id')
    .get(sprintController.getSprintById)
    .put(sprintController.updateSprint)
    .delete(sprintController.deleteSprint);

module.exports = router;
