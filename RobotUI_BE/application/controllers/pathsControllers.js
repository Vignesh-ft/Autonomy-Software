const Path = require('../models/pathsModels'); // Adjust the path as necessary

// POST: Create a new path
exports.createPath = async (req, res) => {
    try {
        const { startPosition, wayPoints, endPosition } = req.body;
        const newPath = new Path({ startPosition, wayPoints, endPosition });
        await newPath.save();
        res.status(201).json({ message: "Path created successfully", path: newPath });
    } catch (error) {
        res.status(500).json({ message: "Error creating path", error });
    }
};

// GET: Retrieve all paths
exports.getAllPaths = async (req, res) => {
    try {
        const paths = await Path.find();
        res.status(200).json(paths);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving paths", error });
    }
};

// GET: Retrieve a single path by ID
exports.getPathById = async (req, res) => {
    try {
        const path = await Path.findById(req.params.id);
        if (!path) {
            return res.status(404).json({ message: "Path not found" });
        }
        res.status(200).json(path);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving path", error });
    }
};

// PUT: Update an existing path by ID
exports.updatePath = async (req, res) => {
    try {
        const { startPosition, wayPoints, endPosition } = req.body;
        const updatedPath = await Path.findByIdAndUpdate(
            req.params.id,
            { startPosition, wayPoints, endPosition },
            { new: true, runValidators: true }
        );
        if (!updatedPath) {
            return res.status(404).json({ message: "Path not found" });
        }
        res.status(200).json({ message: "Path updated successfully", path: updatedPath });
    } catch (error) {
        res.status(500).json({ message: "Error updating path", error });
    }
};

// DELETE: Delete a path by ID
exports.deletePath = async (req, res) => {
    try {
        const deletedPath = await Path.findByIdAndDelete(req.params.id);
        if (!deletedPath) {
            return res.status(404).json({ message: "Path not found" });
        }
        res.status(200).json({ message: "Path deleted successfully", path: deletedPath });
    } catch (error) {
        res.status(500).json({ message: "Error deleting path", error });
    }
};
