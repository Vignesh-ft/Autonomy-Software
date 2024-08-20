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
    required: true,
    validate: {
      validator: function (v) {
        return /\b([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\b/.test(v); // Validates HH:MM:SS format
      },
      message: props => `${props.value} is not a valid time format (HH:MM:SS)!`
    }
  }
}, {
  versionKey: false
});

// Create the model for System Logs
const SystemLog = systemLogsConnection.model('SystemLog', SystemLogSchema);

module.exports = SystemLog;
