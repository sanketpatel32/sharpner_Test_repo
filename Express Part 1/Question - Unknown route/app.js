const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());


// GET /products
app.get("/products", (req, res) => {
  res.send("Here is the list of all products.");
});

// POST /products
app.post("/products", (req, res) => {
  res.status(201).send("A new order has been created.");
});

// GET /catergories
app.get("/catergories", (req, res) => {
  res.send("Here is the list of all categories.");

});

// POST /catergories
app.post("/catergories", (req, res) => {
  res.status(201).json("A new category has been created.");
});

app.use("*",(req,res)=>{
  res.status(404).send("<h1>404 Page Not Found </h1>")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// -- Question for Quick Acces--
// Deliverables:
// Build an Express server that listens on port 4000 and handles the following endpoints:

// GET /products - Respond with "Here is the list of all products."
// POST /products - Respond with "A new product has been added."
// GET /categories - Respond with "Here is the list of all categories."
// POST /categories - Respond with "A new category has been created."


// Additional Requirements:
// Wildcard Route:
// Use a wildcard route (*) to handle all undefined routes and return the following custom error page as HTML:<h1>404 - Page Not Found</h1>
// Also add the status as 404.
// Test all valid routes (GET and POST).
// Access an undefined route, like /random, and verify that the custom error page is displayed.