const express = require("express");
const productRoute = require("./routes/product.js");
const categoryRoute = require("./routes/category.js"); // Corrected spelling

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON body

// Use product routes
app.use("/products", productRoute);

// Use category routes
app.use("/categories", categoryRoute); // Corrected spelling

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
