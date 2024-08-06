const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.createConnection(process.env.MONGO_MAP_URI, );

const transConnection = mongoose.createConnection(process.env.MONGO_TRANSITION_URI,);

const missionConnection = mongoose.createConnection(process.env.MONGO_MISSION_URI)

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

module.exports = { connection, transConnection, missionConnection };
