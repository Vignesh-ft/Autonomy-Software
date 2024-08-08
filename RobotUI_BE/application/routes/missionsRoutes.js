const express = require('express')
const router = express.Router();

const missionControllers = require('../controllers/missionsControllers')

router.get('/', missionControllers.getMissions);
router.post('/', missionControllers.createMission);
router.delete('/:id', missionControllers.deleteMission);
router.put('/:id', missionControllers.updateMission);

module.exports = router;