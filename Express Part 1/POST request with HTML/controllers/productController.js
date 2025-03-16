const express = require("express");
const path = require("path");
const productGetAll = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/product.html"));
};

const productPost = (req, res) => {
    res.json({ value: req.body.productName });
}


const productGet = (req, res) => {
    res.send(`Fetching product with ID: ${req.params.id}`)
};


module.exports = { productGet, productGetAll, productPost };