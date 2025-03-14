const express = require("express");
const app = express();
const port = 4000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next(); // Pass control to the next handler
});

// Middleware to parse JSON body (important for POST requests)
app.use(express.json());

// GET /products
app.get("/products", (req, res) => {
    res.send("Here is the list of all products.");
});

// POST /products
app.post("/products", (req, res) => {
    res.send("A new product has been added.");
});

// GET /categories
app.get("/categories", (req, res) => {
    res.send("Here is the list of all categories.");
});

// POST /categories
app.post("/categories", (req, res) => {
    res.send("A new category has been created.");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
