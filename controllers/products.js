// require model
const Product = require("../models/Product");

const getAllProductsStatic = async (req, res) => {
  const search = "ab";
  // throw new Error("testing async errors package");
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  });
  res.status(200).json({ products, numOfHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { name, featured, company } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  console.log("queryObject: ", queryObject);
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
