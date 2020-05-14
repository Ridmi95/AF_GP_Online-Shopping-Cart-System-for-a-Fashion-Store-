"use strict";
const express = require("express");
const orderRoutes = express.Router();

let Order = require("../Models/order.model");

orderRoutes.route("/add").post(function (req, res) {
  let orders = new Order(req.body);

  orders
    .save()
    .then((order) => {
      res.status(200).json({ success: true, data: order });
    })
    .catch((err) => {
      res.status(400).json({ success: false, data: err });
    });
});

module.exports = orderRoutes;
