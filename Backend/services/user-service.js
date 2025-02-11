const userModel = require("../models/user");

const createUser = async ({
    firstname,lastname,email,password
}) => {
    if(!firstname || !lastname || !password || !email){
        throw new Error("All fields are required");
    }
    const user = await userModel.create({
        fullname : {
            firstname,
            lastname
        },
        email,
        password,
    });

    return user;
}


module.exports = {createUser}