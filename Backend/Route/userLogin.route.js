// const express = require('express');
// const userLoginRoutes = express.Router();
// const bcrypt = require('bcrypt');
// const session = require('express-session');
//
// let UserLogs = require('../Models/userLogin.model');
//
// userLoginRoutes.route('/').post(function (req,res) {
//
//     const username = req.body.username
//     const password = req.body.password;
//
//     UserLogs.findOne({loginusername: username}, function (err,UserLogs) {
//         if(err){
//             console.log(err);
//         }
//         else {
//             try {
//                 if (UserLogs !== null) {
//                     let db_username = UserLogs.req.body.username !== null ?
//                         UserLogs.req.body.username : '';
//                     let db_password = UserLogs.req.body.password !== null ?
//                         UserLogs.req.body.password : '';
//                     bcrypt.compare(req.body.password, db_password, function (err, response) {
//                         if (err) {
//                             console.log(err);
//                         } else {
//                             if (response == true) {
//                                 session.user = db_username;
//                                 res.json(true);
//                             } else {
//                                 console.log("Invalid Username");
//                                 res.json(false);
//                             }
//                         }
//
//                     })
//                 } else {
//                     console.log("Invalid Username");
//                     res.json(false);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     });
//
// });
// // //view all users
// // userLoginRoutes.route('/').get(function (req, res) {
// //     if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
// //         return;
// //     }
// //     UserLogs.find(function (err, users) {
// //         if (err) {
// //             console.log(err);
// //         }
// //         else {
// //             res.json(users);
// //         }
// //     });
// // });
// //
// // //add a user
// // userLoginRoutes.route('/login').post(function (req,res){
// //     //const id = req.body.id;
// //     const bcrypt = require('bcrypt');
// //
// //
// //     const username = req.body.username;
// //     const password = req. body.password;
// //
// //
// //     const newUserLogin = new UserLogs({
// //         username,
// //         password,
// //
// //     });
// //
// //     newUserLogin.save()
// //         .then(()=> res.json('Login successful!'))
// //         .catch(err=> res.status(400).json('Error: ' +err));
// // });
// // //find by id
// // userLoginRoutes.route('/:id').get((req,res)=>{
// //     UserLogs.findById(req.params.id)
// //         .then(user => res.json(user))
// //         .catch(err => res.status(400).json('Error: '+err));
// // });
//
// module.exports = userLoginRoutes;
