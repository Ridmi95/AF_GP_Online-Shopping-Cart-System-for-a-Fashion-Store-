// const express = require('express');
// const userRegRoutes = express.Router();
// const bodyParser = require('body-parser');
//
// let user = require('../Models/userReg.model');
// userRegRoutes.route('/').get((req,res) =>{
//     user.find().then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' +err));
// });
//
// userRegRoutes.route('/register').post(function (req,res){
//     const id = req.body.id;
//     const bcrypt = require('bcrypt');
//
//     const name = req.body.name;
//     const address = req.body.address;
//     const email = req.body.email;
//     const phone = Number(req.body.phone);
//
//     const newUser = new user({
//         id,
//         name,
//         address,
//         email,
//         phone,
//     });
//
//     newUser.save()
//         .then(()=> res.json('User registered!'))
//         .catch(err=> res.status(400).json('Error: ' +err));
// });
//
// module.exports=userRegRoutes;
