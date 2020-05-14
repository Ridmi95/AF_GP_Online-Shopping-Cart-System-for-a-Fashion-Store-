const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema(
  {
    productCode: {
      unique:true,
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Array,
    },
    comment: {
      type: Array,
      
    },
  },
  {
    timestamps:true,
    collection: "product",
  }
);

module.exports = mongoose.model("Product", Product);