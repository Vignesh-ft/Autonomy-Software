// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, deleteUser, updateUserPermissions, getAllUsersPermissions } = require('../controllers/userControllers');

// Route to create a new user
router.post('/users', createUser);

// Route to get all users
router.get('/users', getAllUsers);

// Route to delete a user by userId
router.delete('/users/:username', deleteUser);

// Route to Update a user by username
router.put('/users/:username/permissions', updateUserPermissions);

router.get('/users/:username/permissions', getAllUsersPermissions)
module.exports = router;
