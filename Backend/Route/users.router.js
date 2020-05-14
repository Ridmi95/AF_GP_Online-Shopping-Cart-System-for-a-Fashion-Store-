const express = require('express');
const usersRoutes = express.Router();
const session = require('express-session');

let Users = require('../Models/users.model');

//view all users
usersRoutes.route('/').get(function (req, res) {
    if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
        return;
    }
    Users.find(function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

//add a user
usersRoutes.route('/register').post(function (req,res){
    const id = req.body.id;
    const bcrypt = require('bcrypt');

    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const username = req.body.username;
    const password = req. body.password;
    const phone = Number(req.body.phone);

    const newUser = new Users({
        id,
        name,
        address,
        email,
        username,
        password,
        phone,
    });

    newUser.save()
        .then(()=> res.json('User registered!'))
        .catch(err=> res.status(400).json('Error: ' +err));
});
//find by id
usersRoutes.route('/:id').get((req,res)=>{
    Users.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: '+err));
});

//delete by id
usersRoutes.route('/:id').delete((req,res)=>{
    Users.findByIdAndDelete(req.params.id)
        .then(user => res.json('User is deleted.'))
        .catch(err => res.status(400).json('Error: '+err));
});

//update by id
usersRoutes.route('/update/:id').post((req,res)=> {
    Users.findById(req.params.id)
        .then(user => {
            user.name=req.body.name;
            user.address=req.body.address;
            user.email=req.body.email;
            user.username=req.body.username;
            user.password=req.body.password;
            user.phone=req.body.phone;

            user.save()
                .then(() => res.json('User is updated!'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});
module.exports = usersRoutes;
