const express = require('express');
const loginAuthRoutes = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const config = require('config');
const jwt = require('jsonwebtoken');

let Users = require('../Models/users.model');

//auth user
loginAuthRoutes.route('/').post(function(req,res){
    const {username, password} = req.body;

    //simple validation
    if(!username || !password){
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    //check for existing user
    Users.findOne({username})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exists'});

        //validate password
            bcrypt.compare(password,user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

                jwt.sign(
                    {id : user.id},
                    config.get('jwtSecret'),
                    {expiresIn: 3600},
                    (err,token) =>{
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                email:user.email
                            }
                        });
                    }
                )
                })

        })
});
