const ErrorLog = require('../models/errorlogModels');
const moment = require('moment-timezone');

// Helper function to format date in DD:MM:YYYY HH:mm
const formatDate = (date) => moment(date).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm');

// Create a new error log (POST)
exports.createErrorLog = async (req, res) => {
    try {
        const { moduleName, description,time } = req.body;

        const formattedDate = moment.tz(time, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').isValid()
        ? moment.tz(time, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').toDate()
        : new Date(); // Default to current date if invalid

        const errorLog = new ErrorLog({
            moduleName,
            description,
            time: formattedDate
        });

        const savedErrorLog = await errorLog.save();
        res.status(201).json({
            message: 'Error log created successfully',
            ...savedErrorLog.toObject(),
            time: formatDate(savedErrorLog.time)
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create error log', error });
    }
};

// Get all error logs (GET)
exports.getAllErrorLogs = async (req, res) => {
    try {
        const errorLogs = await ErrorLog.find();
        const formattedLogs = errorLogs.map(log => ({
            ...log.toObject(),
            time: formatDate(log.time)
        }));
        res.status(200).json(formattedLogs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve error logs', error });
    }
};

// Delete an error log by ID (DELETE)
exports.deleteErrorLog = async (req, res) => {
    try {
        const { id } = req.params;
        await ErrorLog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Error log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete error log', error });
    }
};
