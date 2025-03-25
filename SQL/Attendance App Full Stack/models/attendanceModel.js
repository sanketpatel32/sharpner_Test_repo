const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Student = require('./studentModel');

const Attendance = sequelize.define('Attendance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('Present', 'Absent'),
        allowNull: false
    },
    studentId: {
        type: Sequelize.INTEGER,
        references: {
            model: Student,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: false // Disable the automatic addition of createdAt and updatedAt fields
});

// Establishing the relationship
Attendance.belongsTo(Student, { foreignKey: 'studentId', onDelete: 'CASCADE', as: 'Student' });
Student.hasMany(Attendance, { foreignKey: 'studentId', as: 'Attendances' });

module.exports = Attendance;