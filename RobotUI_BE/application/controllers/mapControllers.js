const Map = require('../models/mapModels');
const moment = require('moment-timezone');

// Helper function to format date in DD:MM:YYYY HH:MM
const formatDate = (date) => moment(date).tz('Asia/Kolkata').format('DD:MM:YYYY HH:mm');

// Get all maps
exports.getAllMaps = async (req, res) => {
  try {
    const maps = await Map.find();
    const formattedMaps = maps.map(map => ({
      ...map.toObject(),
      createdAt: formatDate(map.createdAt)
    }));
    res.status(200).json(formattedMaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single map by ID
exports.getMapById = async (req, res) => {
  try {
    const map = await Map.findById(req.params.id);
    if (!map) return res.status(404).json({ message: 'Map not found' });
    res.json({
      ...map.toObject(),
      createdAt: formatDate(map.createdAt)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new map
exports.createMap = async (req, res) => {
  try {
    const { name, site, createdBy, createdAt } = req.body;

    // Check if a map with the same name already exists
    const existingMap = await Map.findOne({ name });
    if (existingMap) {
      return res.status(400).json({ message: 'Map with this name already exists' });
    }

    // Validate and format createdAt
    const formattedDate = moment.tz(createdAt, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').isValid()
      ? moment.tz(createdAt, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').toDate()
      : new Date(); // Default to current date if invalid

    const map = new Map({
      name,
      site,
      createdBy,
      createdAt: formattedDate
    });

    const newMap = await map.save();
    res.status(201).json({
      ...newMap.toObject(),
      createdAt: formatDate(newMap.createdAt) // Format date for response
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Update a map
exports.updateMap = async (req, res) => {
  try {
    const map = await Map.findById(req.params.id);
    if (!map) return res.status(404).json({ message: 'Map not found' });

    map.point = req.body.point || map.point; // Update point if provided
    map.updatedLink = req.body.updatedLink || map.updatedLink; // Update updatedLink if provided
    const updatedMap = await map.save();
    res.json(updatedMap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a map
exports.deleteMap = async (req, res) => {
  try {
    const map = await Map.findByIdAndDelete(req.params.id);
    if (!map) return res.status(404).json({ message: 'Map not found' });

    res.json({ message: 'Map deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
