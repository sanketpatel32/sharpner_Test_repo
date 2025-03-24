const expenseModel = require('../models/expenseModel');


const addExpense = (req, res) => {
    const {description,amount,category} = req.body;
    expenseModel.create({
        description: description,
        amount: amount,
        category: category
    })
    .then(() => {
        console.log("Expense added");
        res.status(201).json({message: "Expense added successfully"});
    })
    .catch(err => {
        console.error("Error adding expense:", err);
        res.status(500).json({message: "Error adding expense"});
    });
}

const getAllExpenses = (req, res) => {
    expenseModel.findAll()
    .then(expenses => {
        res.status(200).json(expenses);
    })
    .catch(err => {
        console.error("Error fetching expenses:", err);
        res.status(500).json({message: "Error fetching expenses"});
    });
}



const updateExpense = (req,res) =>{
    const {id} = req.params;
    const {description,amount,category} = req.body;
    expenseModel.update({
        description: description,
        amount: amount,
        category: category
    }, {
        where: {
            id: id
        }
    })
    .then(() => {
        console.log("Expense updated");
        res.status(200).json({message: "Expense updated successfully"});
    })
    .catch(err => {
        console.error("Error updating expense:", err);
        res.status(500).json({message: "Error updating expense"});
    });
}
const deleteExpense = (req,res) =>{
    const{id} = req.params;
    expenseModel.destroy({
        where: {
            id: id
        }
    })
    .then(() => {
        console.log("Expense deleted");
        res.status(200).json({message: "Expense deleted successfully"});
    })
}

module.exports = {
    addExpense,
    getAllExpenses,
    deleteExpense,
    updateExpense
}