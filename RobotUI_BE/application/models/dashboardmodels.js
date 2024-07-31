const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
  xCoordinates: { type: [Number], required: true },
  yCoordinates: { type: [Number], required: true },
  points: { type: [String], required: true }
});

module.exports = mongoose.model('dashboard', DashboardSchema);
