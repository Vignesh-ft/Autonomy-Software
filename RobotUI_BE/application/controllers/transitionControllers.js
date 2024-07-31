const Transition = require('../models/transitionModels')

exports.getTransitions = async (req, res) => {
    try {
      const transitions = await Transition.find();
      res.status(200).json(transitions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.createTransition = async (req, res) => {
    try {
      const { name, startPosition, endPosition, createdBy } = req.body;
  
      const newTransition = new Transition({
        name,
        startPosition,
        endPosition,
        createdBy
      });
  
      const savedTransition = await newTransition.save();
      res.status(201).json(savedTransition);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  