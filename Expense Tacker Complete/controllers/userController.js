const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const { setUserEmail } = require('../utils/user');


const handleUserSignup = (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    userModel.findOne({ where: { email } })
        .then(existingUser => {
            if (existingUser) {
                res.status(409).json({ message: "User already exists" });
                return null;
            }
            // Hash the password before storing it
            return bcrypt.hash(password, 10).then(hashedPassword => {
                return userModel.create({ name, email, password: hashedPassword });
            });
        })
        .then(newUser => {
            if (newUser) {
                setUserEmail(email);
                res.status(201).json({ message: "User created successfully" });
            }
        })
        .catch(err => {
            console.error("Error during signup:", err);
            res.status(500).json({ message: "Internal server error" });
        });
};

const handleUserLogin = (req, res) => {
    const { email, password } = req.body;

    userModel.findOne({ where: { email } })
        .then(user => {
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ error: "User not found" });
            }

            // Compare the hashed password
            return bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    console.log("Incorrect password");
                    return res.status(401).json({ error: "Incorrect password" });
                }

                setUserEmail(email);
                console.log("User logged in successfully");
                res.status(200).json({ message: "User logged in successfully", user });
            });
        })
        .catch(err => {
            console.error("Error logging in user:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};

module.exports = { handleUserLogin, handleUserSignup };