"use strict";
const express = require("express");
const productRoutes = express.Router();
const auth = require('./managerAuth.js');
const admin_auth = require('./managerAuth.js');

let Product = require("../Models/product.model");

const cloudinary = require("cloudinary").v2;
const fileupload = require('express-fileupload');



cloudinary.config({
  cloud_name :"fashionistaimage",
  api_key : "822148795585776",
  api_secret : "1FbjgHZVhCiU_XRO-rHY7SNE4v0"


});

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

//manager
productRoutes.get("/all",auth , async (req, res) =>{
  await Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: products});
    }
  }).sort({updatedAt:-1});
});






//admin
productRoutes.get("/admin-all",admin_auth , async (req, res) =>{
  await Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: products});
    }
  }).sort({updatedAt:-1});
});



productRoutes.get("/recent",auth , async (req, res) =>{
  await Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: products});
    }
  }).limit(5).sort({createdAt:-1});
});


productRoutes.route("/").get(function (req, res) {
  let category = req.query.category;

  if (category) {
    Product.find({ categoryName: category }, function (err, products) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ success: true, data: products });
      }
    });
  } else {
    Product.find(function (err, products) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ success: true, data: products });
      }
    });
  }
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

// upload file

productRoutes.post('/upload', auth,(req,res) =>{

  let imageUrl="";
  if(req.files===null){
    return res.status(200).json({msg :"No file is Selected to upload. Please select a file first!"})
  }
  const file = req.files.photo;
  console.log("uplod file is:" , file);
  

  cloudinary.uploader.upload(file.tempFilePath, function(err, result){
    
    if(err){

      console.log("Error is :" , err);
      
      return res.status(400).json({msg :"Server Error not Uploaded"})

    }else{
    console.log("Result is :" , res);
    

   

   console.log("response URL: " , result.url);
   res.status(200).json({URL :result.url})

  }
   

});





  


})



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
productRoutes.post('/add', auth, async (req, res) =>{

  const productCode = req.body.productCode;
  const productName = req.body.productName;
  const price = req.body.price;
  const color = req.body.color;
  const categoryName = req.body.categoryName;
  let discount = req.body.discount;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const size = req.body.size;
  const image = req.body.image;

  


  // 
  if(discount==null){

    discount=0;

  }

  if(productCode=="" ||productName=="" ||price=="" ||color=="" ||categoryName=="" ||quantity=="" ||size=="" )              
        return res.status(200).json({warn:"Important fields are empty"});

        const existingProduct = await Product.findOne({productCode:productCode})

  if(existingProduct)
    return res.status(200).json({warn:"Product Code is existing in the Inventory !"})



  const newProduct = new Product({productCode,productName,price,color,categoryName,discount,quantity,description,size,image});

  

  await newProduct.save().then(()=> res.json({msg:"Product Added Successfully !"})).catch(err=> res.status(400).json({msg:"Error!"}));

  



});

//delete product by ID
productRoutes.delete('/delete/:id',auth,async (req, res) =>{

  await Product.findByIdAndDelete(req.params.id).then(product => res.json('products deleted'))
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
