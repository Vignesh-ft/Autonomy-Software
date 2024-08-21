const mongoose = require('mongoose');
const {errorLogsConnection} = require('../dbconfig')

const ErrorLogSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      time: {
        type: Date,
        default: Date.now 
      }
}, 
{
    versionKey : false,
    collection: 'errorlogs' // Specify the new collection name here
});

const ErrorLog = errorLogsConnection.model('ErrorLog;', ErrorLogSchema);
module.exports = ErrorLog;