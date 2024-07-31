const express = require('express');
const authRouter = express.Router();
const { login, logout, register } = require('../controllers/loginControllers');

authRouter.post('/login', login);
authRouter.get('/logout', logout);

module.exports = authRouter;
