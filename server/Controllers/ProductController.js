const Products = require("../Models/ProductModel");


exports.Addproducts = async(req,res)=>{

  const {productname, category,description,price,image}=req.body
  // creating product
  const products= await Products.create({
      productname,
      category,
      description,
      price,
      image
  });

  // respond with the product
  res.json({products:products})
}

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}; 


// single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving product", error: err });
  }
};
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Products.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateProduct= async(req,res)=>{
  const productId = req.params.id

  // get the data from the reqbdoy

  const {productname, category,description,price,image}=req.body

  // find and update 

      await Products.findByIdAndUpdate(productId,{
     productname,
     category,
     description,
     price,
     image
  });

  // find updated by id
  const products = await Products.findById(productId);
  // respond with it

  res.json({products})
}