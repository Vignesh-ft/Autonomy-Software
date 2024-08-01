const Transition = require('../models/transitionModels');
const moment = require('moment-timezone');

// Helper function to format date in DD:MM:YYYY HH:MM
const formatDate = (date) => moment(date).tz('Asia/Kolkata').format('DD:MM:YYYY HH:mm');

// Create a new transition
exports.createTransition = async (req, res) => {
  try {
    const { name, startPosition, endPosition, createdBy, createdOn } = req.body;

    // Check if a transition with the same name already exists
    const existingTransition = await Transition.findOne({ name });
    if (existingTransition) {
      return res.status(400).json({ message: 'Transition with this name already exists' });
    }
    
    const formattedDate = moment.tz(createdOn, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').isValid()
    ? moment.tz(createdAt, 'DD:MM:YYYY HH:mm', 'Asia/Kolkata').toDate()
    : new Date(); // Default to current date if invalid


    const newTransition = new Transition({
      name,
      startPosition,
      endPosition,
      createdBy,
      createdOn: formattedDate
    });

    const savedTransition = await newTransition.save();
    res.status(201).json({
      ...savedTransition.toObject(),
      createdOn: formatDate(savedTransition.createdOn)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get the transition from the database
exports.getTransitions = async (req, res) => {
  try {
    const transitions = await Transition.find();

    // Convert createdOn field to IST
    const formattedTransitions = transitions.map(transition => ({
      ...transition.toObject(),
      createdOn: formatDate(transition.createdOn)
    }));

    res.status(200).json(formattedTransitions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete the transition data from database
exports.deleteTransition = async (req, res) => {
  try {
    const transition = await Transition.findByIdAndDelete(req.params.id);
    if (!transition) return res.status(404).json({ message: 'Transition not found' });

    res.json({ message: 'Transition deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//updating the transtion data from database
exports.updateTransition = async (req, res) => {
  try {
    const transition = await Transition.findById(req.params.id);
    if (!transition) return res.status(404).json({ message: 'Transition not found' });

    transition.name = req.body.name || transition.name;
    transition.startPosition = req.body.startPosition || transition.startPosition;
    transition.endPosition = req.body.endPosition || transition.endPosition;
    transition.createdBy = req.body.createdBy || transition.createdBy;
    transition.createdOn = req.body.createdOn || transition.createdOn;

    const updatedTransition = await transition.save();
    res.json({
      ...updatedTransition.toObject(),
      createdOn: formatDate(updatedTransition.createdOn)
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
