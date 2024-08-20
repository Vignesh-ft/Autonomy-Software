const MissionLog = require('../models/missionLogModels');
const Mission = require('../models/missionModels'); // Assuming you have a Mission model to fetch mission details

exports.createMissionLog = async (req, res) => {
    try {
      const { missionId, state, message, startTime, ranFor } = req.body;
  
      const startedBy = 'dummyUser'; // Hardcoded value
  
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
  
      const newMissionLog = new MissionLog({
        missionName,  // Use the correct field
        state,
        message,
        startTime,
        ranFor,
        startedBy,
      });
  
      const savedMissionLog = await newMissionLog.save();
      res.status(201).json(savedMissionLog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create mission log' });
    }
  };
  
  
  

// GET: Fetch all mission logs
exports.getMissionLogs = async (req, res) => {
  try {
    const missionLogs = await MissionLog.find().populate('missionName', 'name'); // Populating the mission name
    res.status(200).json(missionLogs);
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

    res.status(200).json(missionLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch mission log' });
  }
};
