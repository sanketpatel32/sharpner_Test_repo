const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/add", userControllers.addUser);
router.get("/getAll", userControllers.getAllUsers);
router.delete("/delete/:id", userControllers.deleteUser);
router.put("/edit/:id", userControllers.editUser);

module.exports = router;