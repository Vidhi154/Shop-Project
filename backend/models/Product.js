const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  rating: {
    type: Number,
    default: 0
  },

  stock: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Product", productSchema);