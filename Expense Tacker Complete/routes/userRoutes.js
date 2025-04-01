const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/singup',userController.handleUserSingup);


module.exports = router;