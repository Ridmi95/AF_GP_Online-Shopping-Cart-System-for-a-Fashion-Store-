const router = require('express').Router();

let product = require('../models/product.model');

router.route('/').get((req, res) =>{

    product.find().then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));


});

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

module.exports = router;