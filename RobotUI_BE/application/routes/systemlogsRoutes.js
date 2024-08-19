const express = require('express');
const router = express.Router();
const {
  createSystemLog,
  getSystemLogs,
  deleteSystemLog
} = require('../controllers/systemlogControllers'); // Adjust the path as necessary

// POST route for creating a new system log
router.post('/', createSystemLog);

// GET route for retrieving all system logs
router.get('/', getSystemLogs);

// DELETE route for deleting a system log by ID
router.delete('/:id', deleteSystemLog);

module.exports = router;
