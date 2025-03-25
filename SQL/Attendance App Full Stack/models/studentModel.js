const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Student = sequelize.define('Student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false // Disable the automatic addition of createdAt and updatedAt fields
  });

module.exports = Student;