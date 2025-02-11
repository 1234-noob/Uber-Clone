require("dotenv").config();
const userModel = require("../models/user");
const BlacklistToken = require("../models/blacklistToken");

const jwt = require("jsonwebtoken");


const authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    const isBlackListed = await BlacklistToken.findOne({
        token:token
    })
    if(isBlackListed){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Unauthorized Access"});
        }
        req.user = user;
         next();
         
    }
    catch(error){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }
    }


module.exports = {authUser}