const SystemLog = require('../models/systemlogsModels');
const moment = require('moment-timezone');

// Helper function to format date in DD/MM/YYYY HH:mm in IST
const formatDate = (date) => moment(date).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm');

// POST - Create a new system log
const createSystemLog = async (req, res) => {
  try {
    const { state, moduleName, message, time } = req.body;

    
    const formattedDate = moment.tz(time, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').isValid()
        ? moment.tz(time, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').toDate()
        : new Date(); // Default to current date if invalid

    // Create a new system log entry
    const newSystemLog = new SystemLog({
      state,
      moduleName,
      message,
      time: formattedDate
    });

    // Save to the database
    const savedSystemLog = await newSystemLog.save();
    
    res.status(201).json({ 
      ...savedSystemLog.toObject(),
      time: formattedDate(savedSystemLog.time)
   });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET - Retrieve all system logs
const getSystemLogs = async (req, res) => {
  try {
    const logs = await SystemLog.find(); // Fetch all logs

    const formattedSystemLogs = SystemLog.map(log => ({
      ...log.toObject(),
      time: formatDate(log.time)
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
