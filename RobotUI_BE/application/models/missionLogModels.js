const mongoose = require('mongoose');
const { missionLogsConnection } = require('../dbconfig');

// Define the MissionLog schema
const MissionLogSchema = new mongoose.Schema({
    missionName: {
        type: String, // Ensure this is a String, not ObjectId
        required: true
      },
  state: {
    type: String,
    enum: ['Green', 'Yellow', 'Red'], // Limit the state to these values
    required: true,
  },
  message: {
    type: [String], // Array of strings to list multiple errors
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  ranFor: {
    type: String, // You might want to store this as a string in HH:mm:ss format
    required: true,
  },
  startedBy: {
    type: String, // Store the username from cookies
    required: true,
  },
}, {
  versionKey: false,
  collection: 'missionlogs',
});

// Create and export the MissionLog model
const MissionLog = missionLogsConnection.model('MissionLog', MissionLogSchema);
module.exports = MissionLog;
