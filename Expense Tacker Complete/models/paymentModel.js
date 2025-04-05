const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Payment = sequelize.define('payment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymentSessionId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    orderCurrency: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false
    },
    customerID: { // Ensure this field exists
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Payment;