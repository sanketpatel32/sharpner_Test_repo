const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const users = sequelize.define('bookingapp', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
},{
  timestamps: false // Disable the automatic addition of createdAt and updatedAt fields
});

module.exports = users;