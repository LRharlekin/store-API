// require model
const Product = require("../models/Product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30, $lt: 45 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ products, numOfHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { name, featured, company, sort, fields, numericFilters } = req.query;
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
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(>|>=|=|<=|<)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    // hardcode & select properties that use numeric values / numeric filtering
    const options = ["price", "rating"];
    // only add new property to queryObject if the extracted field is a field from the options array
    filters = filters.split(",").forEach((setting) => {
      const [field, operator, value] = setting.split("-");
      if (options.includes(field)) {
        // e.g.: queryObject:  { price: { '$gt': 40 }, rating: { '$gte': 4 } }
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log("queryObject: ", queryObject);

  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result.sort(sortList);
  } else {
    // default sorting order
    result.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result.select(fieldsList);
  }

  // pagination logic
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

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
