const moment = require('moment-timezone');
const Mission = require('../models/missionModels');
const Map = require('../models/mapModels'); // Assuming this is your Map model

const formatDate = (date) => moment(date).tz('Asia/Kolkata').format('DD:MM:YYYY HH:mm');

exports.createMission = async (req, res) => {
    try {
        const { missionName, mapName, location, createdBy, createdOn, position } = req.body;

        // Check if the mission already exists
        const existingMission = await Mission.findOne({ missionName });
        if (existingMission) {
            return res.status(400).json({ message: 'Mission with this name already exists' });
        }

        // Check if the map exists in the Maps collection
        const map = await Map.findOne({ name: mapName });
        if (!map) {
            return res.status(404).json({ message: `Map with the name '${mapName}' does not exist. Please provide a valid map name.` });
        }

        // Format the createdOn date
        const formattedDate = moment.tz(createdOn, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').isValid()
            ? moment.tz(createdOn, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').toDate()
            : new Date();

        // Create the new mission with site data from the map
        const newMission = new Mission({
            missionName,
            mapName,
            site: map.site, // Use the site from the Maps collection
            location,
            createdBy,
            createdOn: formattedDate,
            position  // Include position only, not retries or distance
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

exports.updateMission = async (req, res) => {
    try {
        const { id } = req.params;
        const { missionName, mapName, site, location, createdBy, position, retries, distance } = req.body;

        // Find the mission by ID and update it
        const updatedMission = await Mission.findByIdAndUpdate(
            id,
            {
                missionName,
                mapName,
                site,
                location,
                createdBy,
                position,
                retries, // Include retries in the update
                distance, // Include distance in the update
                updatedOn: Date.now()
            },
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

