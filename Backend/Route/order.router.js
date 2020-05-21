// "use strict";
// const express = require("express");
// const orderRoutes = express.Router();

// let Order = require("../Models/order.model");

// orderRoutes.route("/add").post(function (req, res) {
//   let orders = new Order(req.body);

//   orders
//     .save()
//     .then((order) => {
//       res.status(200).json({ success: true, data: order });
//     })
//     .catch((err) => {
//       res.status(400).json({ success: false, data: err });
//     });
// });

// module.exports = orderRoutes;
"use strict";
const express = require("express");
const orderRoutes = express.Router();

let Product = require("../Models/product.model");

let Order = require("../Models/order.model");

orderRoutes.route("/add").post(async (req, res) => {
  let orders = new Order(req.body);

  let products = req.body.products;

  orders
    .save()
    .then((order) => {
      products.map((product) => {
        let p = Product.findOneAndUpdate(
          { productCode: product.productCode },
          {
            ...product,
            quantity:
              parseFloat(product.quantity) - parseFloat(product.buyQuantity),
          }
        );
        return p;
      });
      res.status(200).json({ success: true, data: order });
    })
    .catch((err) => {
      res.status(400).json({ success: false, data: err });
    });
});

//get all 
// get by id 
orderRoutes.route("/").get(function (req, res) {
  orders.find(function (err, orders) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ success: true, data: orders });
      }
    });

});

orderRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  orders.findOne({ orderId: id }, function (err, order) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: order });
    }
  });
});



orderRoutes.get('/getbyProduct/:id', (req, res) => {

  let id = req.params.id;

  Order.find({products: {$elemMatch: {_id:id}}} , function (err, orders) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(orders);
    }
  })
});
module.exports = orderRoutes;
