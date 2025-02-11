const userModel = require("../models/user");
const {createUser} = require("../services/user-service");
const {validationResult} = require("express-validator");

const registerUser = async (req,res,next) =>{
    try {
        const error = validationResult(req)
        if(!error){
            return res.status(400).json({error:error.array()})
        };
        const {fullname,password,email} = req.body;
        
        const hashPassword = await userModel.hashPassword(password);
       
        //user creation 
        const user = await createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashPassword
        })
        
        //token gen 
        const token = await user.genAuthToken();
        return res.status(201).json({token,user})
    } catch (error) {
        
    }
}


module.exports = {registerUser};