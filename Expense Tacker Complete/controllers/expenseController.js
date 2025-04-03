const Expense = require('../models/expenseModel');
const User = require('../models/userModel'); 
const { setUserEmail, getUserEmail } = require('../utils/user'); 

const addExpense = async(req, res) => {
    const { amount, description, category } = req.body;
    const userEmail = getUserEmail(req); // Get the user email from the request
    try{
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const expense = await Expense.create({
            amount,
            description,
            category,
            userId: user.id // Use the email from the user object

        });
        res.status(201).json({ message: 'Expense added successfully', expense });

    }
    catch (error) { 
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllExpense = async(req, res) => {
    const userEmail = getUserEmail(req); // Get the user email from the request
    try {
        const user = await User.findOne({ where: { email: userEmail } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const expenses = await Expense.findAll({ where: { userId: user.id } });
        res.status(200).json({ expenses });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const deleteExpense = async(req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        await expense.destroy();
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addExpense,
    getAllExpense,
    deleteExpense
};