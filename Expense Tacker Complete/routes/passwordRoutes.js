const express = require('express');
const router = express.Router();
const path = require('path'); // Import path module for file paths
const passwordController = require('../controllers/passwordController');
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'forgotPassword.html'));
}); // Serve the forgot password page
router.post('/forgotpassword', passwordController.resetPassword); // Call the forgotPassword function when this route is accessed




module.exports = router;