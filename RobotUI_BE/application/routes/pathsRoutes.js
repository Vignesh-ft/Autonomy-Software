const express = require('express');
const router = express.Router();
const pathController = require('../controllers/pathController');

// Define routes
router.post('/', pathController.createPath);
router.get('/', pathController.getAllPaths);
router.get('/:id', pathController.getPathById);
router.put('/:id', pathController.updatePath);
router.delete('//:id', pathController.deletePath);

module.exports = router;
