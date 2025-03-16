const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.get("/", userController.userGetAll);

router.post("/", userController.userPost);

router.get("/:id", userController.userGet);

module.exports = router;
