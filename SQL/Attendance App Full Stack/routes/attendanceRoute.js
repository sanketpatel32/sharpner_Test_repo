const express = require('express');
const attendanceController = require('../controllers/attandanceController');
const router = express.Router();

router.post('/addAttendance', attendanceController.addAttendance);
router.get('/summaryReport', attendanceController.summaryReport);
router.post('/getAllStudent', attendanceController.getAllStudent); // Ensure this is a POST route

module.exports = router;

