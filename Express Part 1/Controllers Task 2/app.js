const express = require("express");
const app = express();
const port = 3000;

const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")
const productRoutes = require("./routes/productRoutes")

app.use("/users",userRoutes)
app.use("/cart",cartRoutes)
app.use("/products",productRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  