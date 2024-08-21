const SystemLog = require('../models/systemlogsModels');
const moment = require('moment-timezone');

// Helper function to format time in HH:mm:ss in IST
const formatTime = (time) => moment(time, 'HH:mm').tz('Asia/Kolkata').format('HH:mm');

// POST - Create a new system log
const createSystemLog = async (req, res) => {
  try {
    const { state, moduleName, message, time } = req.body;

    // Validate and format time or use the current time if invalid
    const formattedTime = moment(time, 'HH:mm', true).isValid()
      ? moment(time, 'HH:mm').tz('Asia/Kolkata').format('HH:mm')
      : moment().tz('Asia/Kolkata').format('HH:mm');

    // Create a new system log entry
    const newSystemLog = new SystemLog({
      state,
      moduleName,
      message,
      time: formattedTime
    });

    // Save to the database
    const savedSystemLog = await newSystemLog.save();

    res.status(201).json(savedSystemLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET - Retrieve all system logs
const getSystemLogs = async (req, res) => {
  try {
    const logs = await SystemLog.find(); // Fetch all logs

    const formattedSystemLogs = logs.map(log => ({
      ...log.toObject(),
      time: formatTime(log.time)
    }));

    res.status(200).json(formattedSystemLogs);
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
