const express = require('express');
const router = express.Router();
const itemControllers = require('../controllers/itemControllers');

router.get('/getItem',itemControllers.getItem)
router.post('/addItem', itemControllers.addItem);
router.put('/remove/:id/:amount', itemControllers.removeItem);


module.exports = router;