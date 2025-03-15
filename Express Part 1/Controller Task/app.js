const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");

app.use(express.json()); // Middleware to parse JSON
app.use("/products", productRoutes); // Using product routes

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
