const mongoose = require('mongoose');
const { systemLogsConnection } = require('../dbconfig');

// Define the schema for System Logs
const SystemLogSchema = new mongoose.Schema({
  state: {
    type: String,
    enum: ['completed', 'partially', 'break'],  // Only allow these three values
    required: true
  },
  moduleName: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: Date.now
  }
}, {
  versionKey: false
});

// Create the model for System Logs
const SystemLog = systemLogsConnection.model('SystemLog', SystemLogSchema);

module.exports = SystemLog;
