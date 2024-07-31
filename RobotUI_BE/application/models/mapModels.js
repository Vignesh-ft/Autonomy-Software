const { Schema, model} = require('mongoose');
const {connection}  = require('../dbconfig');

const mapSchema = new Schema({
    name: { type: String, required: true },
    site: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    point: { type: String, required: false }, // Add the new string field 'point'
    updatedLink: { type: String, required: false } // Add the new string field 'updatedLink'
}, {
    versionKey: false
});

const maps = connection.model('Map', mapSchema, 'Map');  // Define Map model with the 'Map' collection

module.exports = maps;
