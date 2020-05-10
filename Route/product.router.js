"use strict";
const express = require("express");
const productRoutes = express.Router();

let Product = require("../Models/product.model");

productRoutes.route("/add").post(function (req, res) {
  let product = new Product(req.body);

  product
    .save()
    .then((product) => {
      res.status(200).json({ success: true, data: product });
    })
    .catch((err) => {
      res.status(400).json({ success: false, data: err });
    });
});

productRoutes.route("/").get(function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: products });
    }
  });
});

productRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Product.findOne({ productCode: id }, function (err, product) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: product });
    }
  });
});

productRoutes.route("/").put(function (req, res) {
  Product.findOneAndUpdate(
    { productCode: req.body.productCode },
    req.body,
    function (err, product) {
      if (!product) {
        res.status(404).json({ success: false, data: "Product not updated" });
      } else {
        res.status(200).json({ success: true, data: req.body });
      }
    }
  );
});

module.exports = productRoutes;
