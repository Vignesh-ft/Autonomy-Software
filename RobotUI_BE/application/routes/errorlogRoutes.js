const express = require('express');
const router = express.Router();
const errorLogController = require('../controllers/errorLogControllers');

// Route to create a new error log (POST)
router.post('/', errorLogController.createErrorLog);

// Route to get all error logs (GET)
router.get('/', errorLogController.getAllErrorLogs);

// Route to delete an error log by ID (DELETE)
router.delete('/:id', errorLogController.deleteErrorLog);

router.delete('/', async (req, res) => {
    try {
      await ErrorLog.deleteMany({});
      res.status(200).json({ message: 'All logs deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete logs' });
    }
  });

module.exports = router;
