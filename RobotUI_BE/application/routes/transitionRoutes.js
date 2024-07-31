const express = require('express');
const router = express.Router();
const transitionControllers = require('../controllers/transitionControllers');

router.get('/',transitionControllers.getTransitions);
router.post('/', transitionControllers.createTransition);
router.put('/:id',transitionControllers.updateTransition );
router.delete('/:id', transitionControllers.deleteTransition);

module.exports = router;
