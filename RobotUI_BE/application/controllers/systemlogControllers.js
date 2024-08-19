const SystemLog = require('../models/systemlogsModels');
const moment = require('moment-timezone');

// POST - Create a new system log
const createSystemLog = async (req, res) => {
  try {
    const { state, moduleName, message } = req.body;

    // Automatically generate the current time in HH:MM:SS format
    const currentTime = moment().tz('Asia/Kolkata').format('HH:mm:ss');

    // Create a new system log entry
    const newLog = new SystemLog({
      state,
      moduleName,
      message,
      time: currentTime
    });

    // Save to the database
    await newLog.save();
    
    res.status(201).json({ message: 'System log created successfully', data: newLog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET - Retrieve all system logs
const getSystemLogs = async (req, res) => {
  try {
    const logs = await SystemLog.find(); // Fetch all logs
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Remove a system log by ID
const deleteSystemLog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the log by ID
    const deletedLog = await SystemLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res.status(404).json({ message: 'System log not found' });
    }

    res.status(200).json({ message: 'System log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSystemLog,
  getSystemLogs,
  deleteSystemLog
};
