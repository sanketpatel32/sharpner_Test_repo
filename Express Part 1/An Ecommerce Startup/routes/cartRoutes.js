const express = require("express");
const router = express.Router();

router.get("/:id",(req,res)=>{
    res.send(`Fetching cart for user with ID: ${req.params.id}`)
})
router.post("/:id",(req,res)=>{
    res.send(`Adding product to cart for user with ID: ${req.params.id}`)
})
module.exports = router;