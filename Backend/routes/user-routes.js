const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {registerUser,loginUser} = require("../controller/user-controller");

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({
        min:3
    }).withMessage("First name must be 3 characters long"),
    body("fullname.lastname").isLength({
        min:3
    }).withMessage("last name must be 3 characters long"),
    body("password").isLength({
        min:8
    }).withMessage("Password must be 8 characters long"),
],registerUser);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({
        min:8
    }).withMessage("Password must be 8 characters long"),
],loginUser)

module.exports = router;