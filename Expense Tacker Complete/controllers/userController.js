const userModel = require("../models/userModel");



const handleUserSignup = (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    userModel.findOne({ where: { email } })
        .then(existingUser => {
            if (existingUser) {
                res.status(409).json({ message: "User already exists" });
                return null; 
            }
            return userModel.create({ name, email, password });
        })
        .then(newUser => {
            if (newUser) {
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
        .then((user) => {
            if (!user) {
                console.log("User not found");
                return res.status(404).json({ error: "User not found" });
            }

            if (user.password !== password) {
                console.log("Incorrect password");
                return res.status(401).json({ error: "Incorrect password" });
            }

            console.log("User logged in successfully");
            res.status(200).json({ message: "User logged in successfully", user });
        })
        .catch((err) => {
            console.error("Error logging in user:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};
module.exports = { handleUserLogin, handleUserSignup };
