const express = require('express');
const path = require('path'); 
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const isAuth = require('../middleware/authMiddleware');

router.use(isAuth); 
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..' ,'views', 'addExpense.html'));
});
router.post('/add',expenseController.addExpense)
router.get('/getAll', expenseController.getAllExpense);
router.delete('/delete/:id', expenseController.deleteExpense);

module.exports = router;