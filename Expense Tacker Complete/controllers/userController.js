const handleUserSingup = (req, res) => {
    const { name, email, password } = req.body;
    res.status(201).json({ message: "User created successfully", user: { name, email, password } });
    console.log("Signup")
    


}
const handleUserLogin = (req, res) => {
    console.log("Login")
}

module.exports = { handleUserLogin, handleUserSingup };