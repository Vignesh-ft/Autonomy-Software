const mongoose  = require('mongoose');
const { pathsConnection } = require('../dbconfig');

const pathSchema = new mongoose.Schema({
    startPosition: {
        type: mongoose.Schema.Types.Mixed, // Allows any type of data
        required: true
    },
    wayPoints: {
        type: [mongoose.Schema.Types.Mixed], // Array of any type of data
        required: true
    },
    endPosition: {
        type: mongoose.Schema.Types.Mixed, // Allows any type of data
        required: true
    }
}, {
    versionKey: false
});

const Path = pathsConnection.model("Path", pathSchema);
module.exports = Path;
