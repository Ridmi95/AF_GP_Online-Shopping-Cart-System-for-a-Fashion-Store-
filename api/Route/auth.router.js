const express = require('express');
const authRoutes = express.Router();
const session = require('express-session');


authRoutes.route('/').get(function (req, res) {
    if (session.user === null || session.user === '' || session.role === null || session.role === "" || session.role !== 'admin') {
        res.json(false);
    }
});

authRoutes.route('/logout').get(function (req, res) {
    /*session.destroy((err)=> {
        
    });
    res.json(false);  */
    session.user = null;
    session.role = null;
    res.json(false);
});


module.exports = authRoutes;
