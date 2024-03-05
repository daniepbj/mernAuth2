const express = require('express');
const router = express.Router();
const authController = require('../models/controllers/authController'); // Enter the 'models' folder first

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router; 