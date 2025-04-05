const Expense = require('../models/expenseModel');

const addExpense = async (req, res) => {
    const { amount, description, category } = req.body;  
    const userId = req.user.userId; // Extract userId from JWT

    try {
        const expense = await Expense.create({
            amount,
            description,
            category,
            userId 
        });

        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllExpense = async (req, res) => {
    const userId = req.user.userId; // Extract userId from JWT

    try {
        const expenses = await Expense.findAll({ where: { userId } });
        res.status(200).json({ expenses });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // Extract userId from JWT

    try {
        const expense = await Expense.findOne({ where: { id, userId } });

        if (!expense) {
            return res.status(404).json({ error: 'Expense not found or unauthorized' });
        }

        await expense.destroy();
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const sequelize = require("../utils/database"); // Import the Sequelize instance

const getLeaderboard = async (req, res) => {
  try {
    const leaderboardData = await sequelize.query(
      `
      SELECT users.name, SUM(expenses.amount) AS totalExpense
      FROM users
      JOIN expenses ON users.id = expenses.userId
      GROUP BY users.id
      ORDER BY totalExpense DESC;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.status(200).json(leaderboardData);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error.message);
    res.status(500).json({ message: "Error fetching leaderboard data" });
  }
};

module.exports = { addExpense, getAllExpense, deleteExpense,getLeaderboard };
