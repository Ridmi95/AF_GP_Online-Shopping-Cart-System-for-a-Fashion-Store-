const router = require('express').Router();

let product = require('../models/product.model');


//get all the products
router.route('/').get((req, res) =>{

    product.find().then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));


});

// get product by id
router.route('/:id').get((req, res) =>{

    product.findById(req.params.id).then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));


});

//add product
router.route('/add').post((req, res) =>{

    const Name = req.body.Name;
    const Price = req.body.Price;
    const Color = req.body.Color;
    const Category = req.body.Category;
    const Discount = req.body.Discount;
    const Qty = req.body.Qty;

    const newProduct = new product({Name,Price,Color,Category,Discount,Qty});

    newProduct.save().then(()=> res.json('Product added!')).catch(err=> res.status(400).json('Erro' + err));


});

//delete product by ID
router.route('/delete/:id').delete((req, res) =>{

    product.findByIdAndDelete(req.params.id).then(products => res.json('products deleted'))
    .catch(err => res.status(400).json('Error: ' + err));


});

//update product

router.route('/update/:id').post((req, res) =>{

    product.findById(req.params.id).then(

        productObj=>{
            productObj.Name = req.body.Name;
            productObj.Price = req.body.Price;
            productObj.Color = req.body.Color;
            productObj.Category = req.body.Category;
            productObj.Discount = req.body.Discount;
            productObj.Qty = req.body.Qty;

            productObj.save().then(()=> res.json('Updated')).catch(err => res.status(400).json('Erro ' + err));

        }

    ).catch(err => res.status(400).json('Error ' + err));


});

module.exports = router;