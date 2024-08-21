const express = require('express');
const router = express.Router();
const missionLogController = require('../controllers/missionLogControllers');

router.post('/', missionLogController.createMissionLog);
router.get('/', missionLogController.getMissionLogs);
router.get('/:id', missionLogController.getMissionLogById);

module.exports = router;
