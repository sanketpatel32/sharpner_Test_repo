const users = require('../models/userModel');

const addUser = async (req, res) => {
    try {
        const { username, email, phone } = req.body;
        const user = await users.create({ username, email, phone });
        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const usersList = await users.findAll();
        res.status(200).json(usersList);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await users.destroy({ where: { id } });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, phone } = req.body;
        const user = await users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update({ username, email, phone });
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addUser,
    getAllUsers,
    deleteUser,
    editUser
};