const getAllProducts = (req, res) => {
    res.send("Fetching all products");
  };
  
  const getProductById = (req, res) => {
    const productId = req.params.id;
    res.send(`Fetching product with ID: ${productId}`);
  };
  
  const addProduct = (req, res) => {
    res.send("Adding a new product");
  };
  
  // ✅ Export all functions together
  module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
  };
  