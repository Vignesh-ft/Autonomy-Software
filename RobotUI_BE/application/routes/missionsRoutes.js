const express = require('express')
const router = express.Router();

const missionControllers = require('../controllers/missionsControllers')

router.get('/', missionControllers.getMissions);
router.post('/', missionControllers.createMissions);
router.delete('/:id', missionControllers.deleteMission);
router.put('/:id', missionControllers.updateMissions);

module.exports = router;