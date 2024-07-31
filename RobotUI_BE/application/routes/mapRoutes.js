const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapControllers');

router.get('/', mapController.getAllMaps);
router.get('/:id', mapController.getMapById);
router.post('/', mapController.createMap);
router.put('/:id', mapController.updateMap);
router.delete('/:id', mapController.deleteMap);

module.exports = router;
