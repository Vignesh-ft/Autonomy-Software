const mongoose = require('mongoose');
const { Schema } = mongoose;
const connection = require('../dbconfig')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  priority: { type: Number, required: true }
});

const AuthRegisterModel = connection.model('User', userSchema, 'User');

module.exports = AuthRegisterModel;
