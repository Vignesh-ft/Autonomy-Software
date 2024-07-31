const Map = require('../models/mapModels');

// Get all maps
exports.getAllMaps = async (req, res) => {
  try {
    const maps = await Map.find();
    res.json(maps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single map by ID
exports.getMapById = async (req, res) => {
  try {
    const map = await Map.findById(req.params.id);
    if (!map) return res.status(404).json({ message: 'Map not found' });
    res.json(map);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new map
exports.createMap = async (req, res) => {
  try {
    // Check if a map with the same name already exists
    const existingMap = await Map.findOne({ name: req.body.name });
    if (existingMap) {
      return res.status(400).json({ message: 'Map with this name already exists' });
    }

    const map = new Map({
      name: req.body.name,
      site: req.body.site,
      createdBy: req.body.createdBy
    });

    const newMap = await map.save();
    res.status(201).json(newMap);
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
