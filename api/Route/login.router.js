// category.route.js

const express = require('express');
const loginRoutes = express.Router();
const bodyParser = require('body-parser'); //Read body
const bcrypt = require('bcrypt');

// Require Category model in our routes module
let login = require('../Models/login.model');

// Defined get data(index or listing) route
loginRoutes.route('/').post(function (req, res) {

    const postBody = req.body;
    let user = postBody['username'];
    let pass = postBody['password'];
    //console.log(pass);

    login.find({username : user},function (err, loign) {
        if (err) {
            console.log(err);
        }
        else {
            let db_user = loign[0]['username'];
            let db_pass = loign[0]['password']; //password hash
            let db_id   = loign[0]['id'];

            bcrypt.compare(pass, db_pass, function (err, res) {
                if (err) {
                    // Passwords match
                    console.log(err);
                } else {
                    // Passwords don't match
                    console.log(res);
                }
            });


        }
    });

});


loginRoutes.route('/hash').get(function (req, res) {
    bcrypt.hash('123456', 10, function (err, hash) {
        if (err) {
           console.log(err)
        } else {
            res.json(hash)
       }
    });
});








module.exports = loginRoutes;
