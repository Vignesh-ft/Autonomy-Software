const mongoose = require('mongoose');
require('dotenv').config();  //URLs are in env file

const connection = mongoose.createConnection(process.env.MONGO_MAP_URI); //Maps collection

const transConnection = mongoose.createConnection(process.env.MONGO_TRANSITION_URI); //Transition Connection

const missionConnection = mongoose.createConnection(process.env.MONGO_MISSION_URI); //Mission Connection

const systemLogsConnection = mongoose.createConnection(process.env.MONGO_SLOG_URI); //System Logs Connection

const errorLogsConnection = mongoose.createConnection(process.env.MONGO_ELOG_URI); //Error Logs Connection

const missionLogsConnection = mongoose.createConnection(process.env.MONGO_MLOG_URI); //Mission Logs Connection

const pathsConnection = mongoose.createConnection(process.env.MONGO_PATH_URI); //Paths Connection


//Ensuring the connections are working or not!
connection.on('connected', () => {
  console.log('Connected to Maps DB');
});

connection.on('error', (err) => {
  console.error('Failed to connect to Maps DB', err);
  process.exit(1);
});

transConnection.on('connected', () => {
  console.log('Connected to Transition DB');
});

transConnection.on('error', (err) => {
  console.error('Failed to connect to Transition DB', err);
  process.exit(1);
});

missionConnection.on('connected',() => {
  console.log('Connected to Missions DB');
});

missionConnection.on('error', (err) => {
  console.error('Failed to connect to Missions DB', err);
  process.exit(1);
})

systemLogsConnection.on('connected', () => {
  console.log('Connected to Systems Logs DB');
});

systemLogsConnection.on('error',(err) => {
  console.log('Failed to connect to Systems Logs DB', err);
  process.exit(1);
})

errorLogsConnection.on('connected', () => {
  console.log('Connected to Errors Logs DB');
});

errorLogsConnection.on('error',(err) => {
  console.log('Failed to connect to Error Log DB', err);
  process.exit(1);
});

missionLogsConnection.on('connected', () => {
  console.log('Connected to Mission Logs DB');
});

missionLogsConnection.on('error',(err) => {
  console.log('Failed to connect to Mission Log DB', err);
  process.exit(1);
});

pathsConnection.on('connected', () => {
  console.log('Connected to Paths DB');
});

pathsConnection.on('error',(err) => {
  console.log('Failed to connect to Paths DB', err);
  process.exit(1);
});

module.exports = { 
  connection, 
  transConnection,
  missionConnection, 
  systemLogsConnection, 
  errorLogsConnection, 
  missionLogsConnection, 
  pathsConnection 
};
