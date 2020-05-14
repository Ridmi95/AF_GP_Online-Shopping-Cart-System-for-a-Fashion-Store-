const express = require('express');
const loginRoutes = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');


// Require Category model in our routes module
let login = require('../Models/login.model');

// let manager = require('../Models/manager.model');

// Defined get data(index or listing) route
loginRoutes.route('/').post(function (req, res) {

    const postBody = req.body;
    
    let user = postBody['username'];
    let pass = postBody['password'];
   
   // console.log(user); return;

    login.findOne({ username: user }, function (err, login) {
        

        if (err) {
            console.log(err);
        }
        else {

            try {

                if (login !== null) {
                    let db_user = login['username'] !== null ? login['username'] : '';
                    let db_pass = login['password'] !== null ? login['password'] : ''; //password hash
                    let db_id   = login['id'] !== null ? login['id'] : '';
                    let db_role = login['role'] !== null ? login['role'] : '';


                    bcrypt.compare(pass, db_pass, function (err, response) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (response === true) {
                                session.user = db_user;
                                session.role = db_role;
                                res.json(true);
                            } else {
                                console.log("Invalid Username");
                                res.json(false);
                            }
                        }
                    })
                    
                } else {
                    console.log("Invalid Username");
                    res.json(false);
                }
                
            } catch (error) {
                console.log(error);
            }


        }
    });

});



/*
loginRoutes.route('/hash').get(function (req, res) {
    bcrypt.hash('123456', 10, function (err, hash) {
        if (err) {
           console.log(err)
        } else {
            console.log(hash);
            res.json(hash)
       }
    });
});
*/







module.exports = loginRoutes;




