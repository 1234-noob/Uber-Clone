const userModel = require("../models/user");
const { createUser } = require("../services/user-service");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken");
const registerUser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error) {
      return res.status(400).json({ error: error.array() });
    }
    const { fullname, password, email } = req.body;

    const hashPassword = await userModel.hashPassword(password);

    //user creation
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });

    //token gen
    const token = await user.genAuthToken();
    return res.status(201).json({ token, user });
  } catch (error) {}
};

const loginUser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error) {
      return res.status(400).json({ error: error });
    }
    const { email, password } = req.body;
  
    const user = await userModel.findOne({ email }).select("+password");
  
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
     
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = await user.genAuthToken();

    return res.status(200).cookie("token",token).json({
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error});
  }
};


const getUserProfile = async (req,res) => {
    try {
        return res.status(200).json({user:req.user});
        

        
    } catch (error) {
        return res.status(500).json({error:error});
    }
}

const logoutUser = async (req,res) =>{
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    await BlacklistToken.create({token});
    res.status(200).json({
        message:"Logged out successfully",
    }) 
}

module.exports = { registerUser, loginUser ,getUserProfile,logoutUser};
