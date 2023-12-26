// require model
const Product = require("../models/Product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("testing async errors package");
  const products = await Product.find({
    featured: true,
  });
  res.status(200).json({ products, numOfHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  console.log(queryObject);
  // req.query; // returns object with kv-pairs of query params
  const products = await Product.find(queryObject);
  res.status(200).json({ products, numOfHits: products.length });
};

const getProduct = async (req, res) => {};

const createProduct = async (req, res) => {};

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
