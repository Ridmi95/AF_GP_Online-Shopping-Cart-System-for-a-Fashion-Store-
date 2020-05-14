// // category.route.js

const express = require('express');
const categoryRoutes = express.Router();
const session = require('express-session');

// Require Category model in our routes module
let Category = require('../Models/category.model');



// Defined get data(index or listing) route
categoryRoutes.route('/getall').get(function (req, res) {
  Category.find(function (err, categories) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(categories);
    }
  });
});


// Defined store route
categoryRoutes.route('/add').post(function (req, res) {
  if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
    return;
  }
  let category = new Category(req.body);
  category.save()
    .then(category => {
      res.status(200).json({ 'message': 'Category added successfully','status': 200 });
    })
    .catch(err => {
      res.status(400).json({ 'message': 'Unable to save category','status': 400 });
    });
});

// Defined get data(index or listing) route
categoryRoutes.route('/').get(function (req, res) {
  if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
    return;
  }
  Category.find(function (err, categories) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(categories);
    }
  });
});

// Defined edit route
categoryRoutes.route('/edit/:id').get(function (req, res) {
  if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
    return;
  }
  let id = req.params.id;
  Category.findById({ _id: req.params.id}, function (err, category) {
    res.json(category);
  });
});

//  Defined update route
categoryRoutes.route('/update/:id').post(function (req, res) {
  if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
    return;
  }
  Category.findById(req.params.id, function (err, category) {
    if (!category)
      res.status(404).send("data is not found");
    else {
      category.category_name = req.body.category_name;
      category.is_active = req.body.is_active;
      category.category_description = req.body.category_description;

      category.save().then(category => {
        res.json({ 'message': 'Category updated','status': 200});
      })
        .catch(err => {
          res.status(400).json({ 'message': 'Unable to update category', 'status': 200 });
        });
    }
  });
});

// Defined delete | remove | destroy route
categoryRoutes.route('/delete/:id').get(function (req, res) {
  if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
    return;
  }
  Category.findByIdAndRemove({ _id: req.params.id }, function (err, category) {
    if (err) res.json(err);
    else res.json({ 'message': 'Category deleted', 'status': 200 });
  });
});


module.exports = categoryRoutes;

