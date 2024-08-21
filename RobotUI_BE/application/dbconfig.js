const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.createConnection(process.env.MONGO_MAP_URI);

const transConnection = mongoose.createConnection(process.env.MONGO_TRANSITION_URI);

const missionConnection = mongoose.createConnection(process.env.MONGO_MISSION_URI);

const systemLogsConnection = mongoose.createConnection(process.env.MONGO_SLOG_URI);

const errorLogsConnection = mongoose.createConnection(process.env.MONGO_ELOG_URI);

const missionLogsConnection = mongoose.createConnection(process.env.MONGO_MLOG_URI);

connection.on('connected', () => {
  console.log('Connected to Maps DB');
});

connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

transConnection.on('connected', () => {
  console.log('Connected to Transition DB');
});

transConnection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

missionConnection.on('connected',() => {
  console.log('Connected to Missions DB');
});

missionConnection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
})

systemLogsConnection.on('connected', () => {
  console.log('Connected to Systems Logs DB');
});

systemLogsConnection.on('error',(err) => {
  console.log('Failed to connect to MongoDB', err);
  process.exit(1);
})

errorLogsConnection.on('connected', () => {
  console.log('Connected to Erros Logs DB');
});

errorLogsConnection.on('error',(err) => {
  console.log('Failed to connect to Error Log DB', err);
  process.exit(1);
});

missionLogsConnection.on('connected', () => {
  console.log('Connected to Mission Logs DB');
});

missionLogsConnection.on('error',(err) => {
  console.log('Failed to connect to Error Log DB', err);
  process.exit(1);
});

module.exports = { connection, transConnection, missionConnection, systemLogsConnection, errorLogsConnection, missionLogsConnection };
