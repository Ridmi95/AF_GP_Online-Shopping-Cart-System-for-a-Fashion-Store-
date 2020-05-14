"use strict";
const express = require("express");
const productRoutes = express.Router();

let Product = require("../Models/product.model");

// productRoutes.route("/add").post(function (req, res) {
//   let product = new Product(req.body);

//   product
//     .save()
//     .then((product) => {
//       res.status(200).json({ success: true, data: product });
//     })
//     .catch((err) => {
//       res.status(400).json({ success: false, data: err });
//     });
// });

productRoutes.route("/").get(function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.json(products);
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

//search by Id
productRoutes.route("/search/:key").get(function (req, res) {

  let key = req.params.key;
  Product.findOne(
    { productCode: key
      
       
    
    },function (err, product) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ success: true, data: product });
          }
        });
      });

//update by product code

productRoutes.route("/update/bycode/").put(function (req, res) {
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





//product Admin


//get all the products
// productRoutes.route('/list').get((req, res) =>{

//   Product.find().then(product => res.json(product))
//   .catch(err => res.status(400).json('Error: ' + err));


// });

// get product by id
productRoutes.route('/list/:id').get((req, res) =>{

  Product.findById(req.params.id).then(product => res.json(product))
  .catch(err => res.status(400).json('Error: ' + err));


});

//add product
productRoutes.route('/add').post((req, res) =>{

  const productCode = req.body.productCode;
  const productName = req.body.productName;
  const price = req.body.price;
  const color = req.body.color;
  const categoryName = req.body.categoryName;
  const discount = req.body.discount;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const size = req.body.size;

  const newProduct = new Product({productCode,productName,price,color,categoryName,discount,quantity,description,size});

  newProduct.save().then(()=> res.json('success')).catch(err=> res.status(400).json('Erro' + err));


});

//delete product by ID
productRoutes.route('/delete/:id').delete((req, res) =>{

  Product.findByIdAndDelete(req.params.id).then(product => res.json('products deleted'))
  .catch(err => res.status(400).json('Error: ' + err));


});

//update product

productRoutes.route('/update/:id').post((req, res) =>{

  Product.findById(req.params.id).then(

      productObj=>{
        productObj.productCode = req.body.productCode;
        productObj.productName = req.body.productName;
        productObj.price = req.body.price;
        productObj.color = req.body.color;
        productObj.categoryName = req.body.categoryName;
        productObj.discount = req.body.discount;
        productObj.quantity = req.body.quantity;
        productObj.description = req.body.description;
        productObj.size = req.body.size;

          productObj.save().then(()=> res.json('Updated')).catch(err => res.status(400).json('Erro ' + err));

      }

  ).catch(err => res.status(400).json('Error ' + err));


});

module.exports = productRoutes;
