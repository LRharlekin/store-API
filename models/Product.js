const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name for product must be provided."],
    trim: true,
    default: "product name",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
