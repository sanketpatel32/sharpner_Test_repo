const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expense.controller');

router.get('/getall', expenseController.getAllExpenses);
router.post('/add',  expenseController.addExpense );
router.delete('/delete/:id', expenseController.deleteExpense);
router.put('/edit/:id', expenseController.updateExpense); 
module.exports = router;