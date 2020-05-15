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

module.exports = orderRoutes;
