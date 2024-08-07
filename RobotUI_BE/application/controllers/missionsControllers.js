const Mission = require('../models/missionModels');
const moment = require('moment-timezone');

const formatDate = (date) => moment(date).tz('Asia/Kolkata').format('DD:MM:YYYY HH:mm');


//creating the new mission
exports.createMissions = async (req, res) => {

}

//viewing the mission
exports.getMissions = async(req, res) => {

}

//deleting the mission
exports.deleteMission = async(req, res) => {

}

//updating the missions
exports.updateMissions = async(req, res) => {
    
}