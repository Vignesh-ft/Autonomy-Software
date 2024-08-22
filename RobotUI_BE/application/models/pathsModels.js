const mongoose  = require('mongoose')
const { pathsConnection } = require('../dbconfig');

const pathSchema = new mongoose.Schema({
    //enter the schema..
},{
    versionKey : false,
    connection: path
});

const Path = pathsConnection.model("Path", pathSchema);
module.exports = Path;