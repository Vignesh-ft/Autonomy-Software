const mongoose = require('mongoose');
const connection  = require('../dbconfig')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    permissions: {
        maps: {
          enable: { type: Boolean, default: false },
          create: { type: Boolean, default: false },
          edit: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
          view: { type: Boolean, default: false }
          
        },
        mission: {
          enable: { type: Boolean, default: false },
          create: { type: Boolean, default: false },
          edit: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
          view: { type: Boolean, default: false }
        },
        transition: {
          enable: { type: Boolean, default: false },
          create: { type: Boolean, default: false },
          edit: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
          view: { type: Boolean, default: false }
        },
        paths: {
          enable: { type: Boolean, default: false },
          create: { type: Boolean, default: false },
          edit: { type: Boolean, default: false },
          delete: { type: Boolean, default: false },
          view: { type: Boolean, default: false }
        }
      }
    
},{
    versionKey :false
});

const User = connection.model('User', userSchema, 'User');  // Define User model

module.exports = User;
