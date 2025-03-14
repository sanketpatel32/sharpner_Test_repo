const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());


const orders = [
  { id: 1, item: "Laptop", quantity: 1, price: 75000, status: "Shipped" },
  { id: 2, item: "Phone", quantity: 2, price: 25000, status: "Processing" },
  { id: 3, item: "Headphones", quantity: 1, price: 3000, status: "Delivered" },
  { id: 4, item: "Keyboard", quantity: 1, price: 1500, status: "Pending" },
  { id: 5, item: "Monitor", quantity: 1, price: 12000, status: "Shipped" },
];

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET /orders
app.get("/orders", (req, res) => {
  console.log("Here is the list of all orders.");
  res.json(orders);
});

// POST /orders
app.post("/orders", (req, res) => {
  console.log("A new order has been created.");
  console.log("Order Details:", req.body); // Log the received order data
  orders.push(req.body)
  res
    .status(201)
    .json({ message: "Order created successfully", order: req.body });
});

// GET /users
app.get("/users", (req, res) => {
  console.log("Here is the list of all users.");
  res.json(users);
});

// POST /users
app.post("/users", (req, res) => {
  console.log("A new user has been added.");
  console.log("User Details:", req.body);
  users.push(req.body);
  res.status(201).json({ message: "User added successfully", user: req.body });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// -- Question for Quick Acces--
// Create a server using Express that listens on port 3000 and handles the following endpoints with appropriate responses:

// GET /orders - Respond with "Here is the list of all orders."
// POST /orders - Respond with "A new order has been created."
// GET /users - Respond with "Here is the list of all users."
// POST /users - Respond with "A new user has been added."

// Requirements:
// Test each endpoint to confirm it works as expected when accessed via a browser (for GET) or a tool like Postman (for POST).
// Use console.log to indicate when the server is successfully running (e.g., "Server is running on http://localhost:3000").
