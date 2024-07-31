const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_USERMANAGE_URI;

const connection = mongoose.createConnection(process.env.MONGO_USERMANAGE_URI);

connection.on('connected', () => {
  console.log('Connected to Users DB');
});

connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

module.exports = connection;
