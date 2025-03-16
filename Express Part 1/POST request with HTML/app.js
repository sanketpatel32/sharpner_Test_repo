const express = require("express");
const app = express();
const port = 4000;
const path = require("path");

const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")
const productRoutes = require("./routes/productRoutes")
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/users",userRoutes)
app.use("/cart",cartRoutes)
app.use("/products",productRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  