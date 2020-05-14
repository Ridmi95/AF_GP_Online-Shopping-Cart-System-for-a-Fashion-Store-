// category.route.js

const express = require("express");
const categoryRoutes = express.Router();

// Require Category model in our routes module
let Category = require("../Models/category.model");

// Defined store route
categoryRoutes.route("/add").post(function (req, res) {
  let category = new Category(req.body);
  category
    .save()
    .then((category) => {
      res.status(200).json({ category: "Category added successfully" });
    })
    .catch((err) => {
      res.status(400).send("unable to save category");
    });
});

// Defined get data(index or listing) route
categoryRoutes.route("/").get(function (req, res) {
  Category.find(function (err, categories) {
    if (err) {
      res.status(400).json({ success: false, data: "data not found" });
    } else {
      res.status(400).json({ success: true, data: categories });
    }
  });
});

// Defined edit route
categoryRoutes.route("/edit/:id").get(function (req, res) {
  let id = req.params.id;
  Category.findById(id, function (err, category) {
    res.json(category);
  });
});

//  Defined update route
categoryRoutes.route("/update/:id").post(function (req, res) {
  Category.findById(req.params.id, function (err, category) {
    if (!category) res.status(404).send("data is not found");
    else {
      category.category_name = req.body.category_name;
      category.is_active = req.body.is_active;
      category.category_description = req.body.category_description;

      category
        .save()
        .then((category) => {
          res.json("Update complete");
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
categoryRoutes.route("/delete/:id").get(function (req, res) {
  Category.findByIdAndRemove({ _id: req.params.id }, function (err, category) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});
module.exports = categoryRoutes;
