const express = require('express');
const path = require('path'); 
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware'); // Import JWT Middleware
const { createOrder } = require('../controllers/paymentController'); // Import Payment Controller
// Expense Routes with Authentication
router.post('/premium', createOrder );
module.exports = router;