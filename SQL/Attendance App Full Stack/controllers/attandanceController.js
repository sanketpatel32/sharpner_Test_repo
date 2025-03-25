const studentModel = require('../models/studentModel');
const attendanceModel = require('../models/attendanceModel');

const getAllStudent = async (req, res) => {
    try {
        const { date } = req.body; // Destructure date from req.body
        if (!date) {
            return res.status(400).json({ message: 'Date is required' });
        }

        // Check if there are attendance records for the given date
        const attendanceRecords = await attendanceModel.findAll({
            where: { date: date },
            include: {
                model: studentModel,
                as: 'Student'
            }
        });

        if (attendanceRecords.length > 0) {
            // If attendance records exist for the given date, return them
            const attendanceData = attendanceRecords.map(record => ({
                name: record.Student.name,
                status: record.status
            }));
            res.json([attendanceData,{display:true}]);
        } else {
            // If no attendance records exist for the given date, return all students with status 'Absent'
            const students = await studentModel.findAll();
            const attendanceData = students.map(student => ({
                studentId : student.id,
                name: student.name,
                status: 'Present' // Default status
            }));
            res.json([attendanceData,{display:false}]);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addAttendance = async (req, res) => {
    const { date, attendanceData } = req.body;

    try {
        // Insert each attendance record into the table
        for (const record of attendanceData) {
            await attendanceModel.create({
                date: date,
                studentId: record.studentId,
                status: record.status
            });
        }

        res.status(200).json({ message: 'Attendance submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const summaryReport = async (req, res) => {
    try {
        const attendanceRecords = await attendanceModel.findAll({
            include: {
                model: studentModel,
                as: 'Student' // Ensure the alias matches the model association
            }
        });

        const summary = {};

        attendanceRecords.forEach(record => {
            const studentName = record.Student.name;
            if (!summary[studentName]) {
                summary[studentName] = { name: studentName, present: 0, absent: 0, percentage: 0 };
            }
            if (record.status === 'Present') {
                summary[studentName].present += 1;
            } else {
                summary[studentName].absent += 1;
            }
        });

        Object.keys(summary).forEach(studentName => {
            const total = summary[studentName].present + summary[studentName].absent;
            summary[studentName].percentage = total > 0 ? Math.round((summary[studentName].present / total) * 100) + '%' : '0%';
        });

        res.json(Object.values(summary));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllStudent, addAttendance, summaryReport };
