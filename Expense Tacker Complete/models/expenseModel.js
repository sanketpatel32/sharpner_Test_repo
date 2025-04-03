const sequelize = require('../utils/database');
const Sequelize = require('sequelize');
const User = require('./userModel'); // Import the user model

const expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User, // Reference the user model
            key: 'id'
        },
        onDelete: 'CASCADE' // Optional: Delete expenses if the user is deleted
    }
}, { timestamps: false });

module.exports = expense;