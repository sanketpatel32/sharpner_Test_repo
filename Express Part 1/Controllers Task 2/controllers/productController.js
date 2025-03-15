const express = require("express");
const productGetAll = (req,res)=>{
    res.send("Fetching all products")
};

const productPost = (req,res)=>{
    res.send("Adding a new product")
}


const productGet = (req,res)=>{
    res.send(`Fetching product with ID: ${req.params.id}`)
};


module.exports = {productGet,productGetAll,productPost};