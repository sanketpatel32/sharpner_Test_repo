const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    premiumUser: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
}, {timestamps:false});

module.exports = user;