const express = require('express')
const router = express.Router();

const missionControllers = require('../controllers/missionsControllers')

router.get('/', missionControllers.getMissions);
router.post('/', missionControllers.createMission);
router.delete('/:id', missionControllers.deleteMission);
router.put('/:id', missionControllers.updateMission_1);
router.put('/missions/:id', missionControllers.updateMission_2);

module.exports = router;