const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController")

router.get("/",productController.productGetAll);

router.post("/",productController.productPost)


router.get("/:id",productController.productGet);


module.exports = router;