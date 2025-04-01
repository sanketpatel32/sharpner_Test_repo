const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/signup',userController.handleUserSignup);
router.post('/login',userController.handleUserLogin);

module.exports = router;