const moment = require('moment-timezone');
const Mission = require('../models/missionModels');

const formatDate = (date) => moment(date).tz('Asia/Kolkata').format('DD:MM:YYYY HH:mm');

// Creating a new mission
exports.createMission = async (req, res) => {
    try {
        const { missionName, mapName, site, location, createdBy, createdOn } = req.body;

        // Check if mission with the same name already exists
        const existingMission = await Mission.findOne({ missionName });
        if (existingMission) {
            return res.status(400).json({ message: 'Mission with this name already exists' });
        }

        // Format the createdOn date
        const formattedDate = moment.tz(createdOn, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').isValid()
            ? moment.tz(createdOn, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').toDate()
            : new Date(); // Default to current date if invalid

        const newMission = new Mission({
            missionName,
            mapName,
            site,
            location,
            createdBy,
            createdOn: formattedDate,
        });

        const savedMission = await newMission.save();
        res.status(201).json({
            ...savedMission.toObject(),
            createdOn: formatDate(savedMission.createdOn)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Viewing all missions
exports.getMissions = async (req, res) => {
    try {
        const missions = await Mission.find();
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch missions' });
    }
};

// Deleting a mission
exports.deleteMission = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMission = await Mission.findByIdAndDelete(id);

        if (!deletedMission) {
            return res.status(404).json({ error: 'Mission not found' });
        }

        res.status(200).json({ message: 'Mission deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete mission' });
    }
};

// Updating a mission
exports.updateMission = async (req, res) => {
    try {
        const { id } = req.params;
        const { missionName, mapName, site, location, createdBy } = req.body;

        const updatedMission = await Mission.findByIdAndUpdate(
            id,
            { missionName, mapName, site, location, createdBy, updatedOn: Date.now() },
            { new: true }
        );

        if (!updatedMission) {
            return res.status(404).json({ error: 'Mission not found' });
        }

        res.status(200).json(updatedMission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update mission' });
    }
};
