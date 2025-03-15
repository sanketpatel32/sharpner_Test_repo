const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// ✅ Using controller functions from the exported object
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.addProduct);

module.exports = router;
