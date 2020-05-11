// Manager.route.js

const express = require('express');
const ManagerRoutes = express.Router();
const bodyParser = require('body-parser'); //Read body
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const session = require('express-session');

// Require Manager model in our routes module
let login = require('../Models/login.model');


async function hashPassword(pass) {

    try {
        let password = pass
        let saltRounds = 10;
    
        let hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
    
        return hashedPassword
        
    } catch (err) {
        console.log(err)
    }

}

//Senda activation mail
function sendMail(mailOptions) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ptester473@gmail.com',
            pass: 'alpha@123'
        }
    });


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// Add new manager
ManagerRoutes.route('/add').post(function (req, res) {
    if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
        return;
    }
    //Validate user input
    function validate(){
        res.status(400).json({ 'message': 'You must fill all fields in form' });
        return;
    }

    req.body['username'] == '' || req.body['password'] == '' ? validate() : null;

    login.find({username : req.body['username']},function (err, managers) {
        if (err) {
            console.log(err);
        } else {
            
            if (managers.length == 0) {

                hashPassword(req.body.password).then(function (hash) {
                    
                    let _p = req.body.password;

                    req.body.role = 'manager';
                    req.body.password = hash;
                    req.body.is_active = 0;

                    let Manager = new login(req.body);
                    Manager.save()
                    .then(Manager => {
                        res.status(200).json({ 'message': 'Manager added successfully', 'status': 200 });

                        mailOptions = {
                            from: 'ptester473@gmail.com',
                            to: req.body.email,
                            subject: 'Activate Your Account',
                            text: 'http://localhost:4000/managers/activate/'+req.body.email + " username : " + req.body.username + " , password : " + _p 
                        }


                        sendMail(mailOptions);
                    })
                    .catch(err => {
                        res.status(400).json({ 'message': 'Unable to save Manager', 'status': 400 });
                    });                
                });

            } else {
                res.status(400).json({ 'message': 'This username has been taken already', 'status': 400 });
            }  
       }
    });


});

// Get all managers to display
ManagerRoutes.route('/').get(function (req, res) {
    if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
        return;
    }
    login.find({role:'manager'},function (err, managers) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(managers);
        }
    });
});

// Get data for edit
ManagerRoutes.route('/edit/:id').get(function (req, res) {
    if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
        return;
    }
    login.findById({ _id: req.params.id }, function (err, Manager) {
        if (err) {
            console.log(err)
        } else {
            res.json(Manager);
        }
    });
});

// Update manager info
ManagerRoutes.route('/update/:id').post(function (req, res) {
    if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
        return;
    }
    login.findById({ _id: req.params.id }, function (err, Manager) {
        
        if (err) {
            console.log(err)
        } else {
            if (!Manager) {
                res.json({'message':'Manager not found','status':400});
            } else {

                console.log(req.body.username);

                Manager.username = req.body.username;
                Manager.is_active = req.body.is_active;
                Manager.email = req.body.email;
                //update password if only is set user input
                if (req.body.password) {
                    Manager.password = req.body.password;
                }
    
                Manager.save().then(Manager => {
                    res.json({ 'message': 'Manager updated', 'status': 200 });
                })
                    .catch(err => {
                        res.json({ 'message': 'Unable to update Manager', 'status': 200 });
                    });
            }
        }

    });
});

// Delete manager
ManagerRoutes.route('/delete/:id').get(function (req, res) {
    if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
        return;
    }
    login.findByIdAndRemove({ _id: req.params.id }, function (err, Manager) {
        if (err) {
            res.json(err)
        } else {
            res.json({ 'message': 'Manager deleted', 'status': 200 });
        };
    });
});

//Activate account

// Update manager info
ManagerRoutes.route('/activate/:email').get(function (req, res) {
    login.findOne({ email: req.params.email }, function (err, Manager) {
        if (err) {
            console.log(err);
            res.json("Unable to activate this account.");
        } else {
            if (!Manager) {
                res.json("This account not found");
            } else {

                Manager.is_active = 1;

                Manager.save().then(Manager => {
                    res.json("Account activated successfully.");
                }).catch(err => {
                    res.json("Unable to activate this account.");
                    console.log(err);
                });
            }
        }

    });
});

module.exports = ManagerRoutes;
