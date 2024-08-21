const MissionLog = require('../models/missionLogModels');
const Mission = require('../models/missionModels'); // Assuming you have a Mission model to fetch mission details
const moment = require('moment-timezone');

// Helper function to format date in DD/MM/YYYY HH:mm in IST
const formatDate = (date) => moment(date).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm');

// Create a new mission log
exports.createMissionLog = async (req, res) => {
    try {
        const { missionId, state, message, ranFor, startedBy, startTime } = req.body;
        
        // Check if the mission exists
        const mission = await Mission.findById(missionId);
        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }

        // Use the correct field from the mission object
        const missionName = mission.missionName; // This should be a string
        console.log("Mission Name:", missionName);

        if (!missionName) {
            return res.status(500).json({ error: 'Mission name could not be retrieved' });
        }

        const formattedDate = moment.tz(startTime, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').isValid()
        ? moment.tz(startTime, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').toDate()
        : new Date(); // Default to current date if invalid


        // Create a new mission log with the current timestamp
        const newMissionLog = new MissionLog({
            missionName,  // Use the correct field
            state,
            message,
            ranFor,
            startedBy,
            startTime: formattedDate // Set current time in IST
        });

        const savedMissionLog = await newMissionLog.save();
        res.status(201).json({
          ...savedMissionLog.toObject(),
          startTime: formatDate(savedMissionLog.startTime)
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create mission log' });
    }
};

// GET: Fetch all mission logs
exports.getMissionLogs = async (req, res) => {
    try {
        const missionLogs = await MissionLog.find().populate('missionName', 'name'); // Populating the mission name

        // Format dates for all fetched mission logs
        const formattedMissionLogs = missionLogs.map(log => ({
            ...log.toObject(),
            startTime: formatDate(log.startTime) 
        }));

        res.status(200).json(formattedMissionLogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch mission logs' });
    }
};

// GET: Fetch a specific mission log by ID
exports.getMissionLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const missionLog = await MissionLog.findById(id).populate('missionName', 'name');

        if (!missionLog) {
            return res.status(404).json({ error: 'Mission log not found' });
        }

        const formattedMissionLog = {
            ...missionLog.toObject(),
            startTime: formatDate(missionLog.startTime)
        };

        res.status(200).json(formattedMissionLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch mission log' });
    }
};
