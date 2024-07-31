const mongoose = require('mongoose');
const { transConnection } = require('../dbconfig');

const TransitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startPosition: {
    type: String,
    required: true
  },
  endPosition: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Transition = transConnection.model('Transition', TransitionSchema);

module.exports = Transition;
