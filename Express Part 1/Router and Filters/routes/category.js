const express = require("express");
const router = express.Router();

// GET /categories
router.get("/", (req, res) => {
  res.send("Here is the list of all categories.");
});

// POST /categories
router.post("/", (req, res) => {
  res.status(201).json({ message: "A new category has been created." });
});

module.exports = router;
