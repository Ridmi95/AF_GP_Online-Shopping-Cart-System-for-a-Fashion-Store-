const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userLoginRoutes = express.Router();

let Users = require('../Models/users.model');
const config = require('../configure.js');
const loginauth = require('../Route/userLoginAuth.router');


//log in
userLoginRoutes.post("/user-log", async(req,res) => {
    try {
        let {username, password} = req.body;

        ///validations
        if (!username || !password)
            return res.status(400).json({msg: "Enter all the fields"});

        const user = await Users.findOne({username: username});
        if (!user)
            return res.status(400)
                .json({msg: " An account does no exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400)
                .json({msg: " Invalid credentials"});

        const token = jwt
        .sign({id: user._id}, config.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username
            },
        });
        console.log(token);
       

    } catch (err) {
        res.status(500).json({err: err.message});
    }
});

//validate token
userLoginRoutes.post("/validate-token-login" ,async (req,res)=>{

    try {

        const token = req.header("login-auth-token");
        if(!token) return res.json(false);

        const verified = jwt.verify(token,config.JWT_SECRET);
        if(!verified) return res.json(false);

        const user = await Users.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);


    } catch (error) {
        res.status(400).json({msg:"Validation Error"});
        console.log("Error: " ,error);

    }



});
module.exports = userLoginRoutes;
