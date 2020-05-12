const express = require('express');
const usersRoutes = express.Router();
const session = require('express-session');

let Users = require('../Models/users.model');

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


module.exports = usersRoutes;