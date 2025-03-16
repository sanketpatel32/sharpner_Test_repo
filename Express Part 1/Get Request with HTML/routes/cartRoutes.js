const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController")
router.get("/:id",cartController.cartGet)
router.post("/:id",cartController.cartPost)
module.exports = router;