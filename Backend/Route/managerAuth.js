const jwt = require('jsonwebtoken');
const JWT_SECRET="F9qy&s)?4=33s%$2h#F~";

const auth = (req,res,location) =>{

    try{
        const token = req.header("manager-token");

        if(!token)
        return res.status(401).json({msg:'Access Denied !'});
        const validate = jwt.verify(token,JWT_SECRET);


        if(!validate)
        res.status(401).json({msg:"Faild Token Verification. Access Denied!"})



    }catch(err){
        res.status(500).json({erro : err});

    }

}
module.exports = managerAuth