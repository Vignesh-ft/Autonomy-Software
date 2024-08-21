const mongoose  = require('mongoose')
const { missionConnection } = require('../dbconfig');

const missionSchema = new mongoose.Schema({
    missionName:{
        type: String,
        required: true
    },
    mapName: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    retries: {
        type: Number
    },
    distance: {
        type: Number
    },
    createdBy: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false
});

const Mission = missionConnection.model("Mission", missionSchema);
module.exports = Mission;