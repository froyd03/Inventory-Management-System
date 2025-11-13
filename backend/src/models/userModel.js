const dotenv = require("dotenv");
dotenv.config();

const database = require("../config/database.js");
const jwt = require("jsonwebtoken");
const {compare, hash} = require("bcrypt");

async function createUser(name, email, password) { //create
    try{
        const hashedPassword = await hash(password, 10);

        await database.query(
            "INSERT INTO users(name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        const result = await userAuthenticate(email, password);
        return result;
    }
    catch(error){
        return {"response": error.message , "status": false}; 
    }
}

async function userAuthenticate(email, password) { //read

    try{
        const [user] = await database.query("SELECT * FROM users WHERE email = ?", [email]);

        const isPasswordMatch = await compare(password, user[0].password);

        console.log(isPasswordMatch);
        if(email === user[0].email && isPasswordMatch){
            const payload = {_id: user[0].id, email: user[0].email};
            const token = jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "1h"});

            if(token) return {"response": token, "status": true};  
            else throw new Error("Error login! no token");

        }else{
            return {"response": "email or password incorrect", "status": false}; 
        }
    }
    catch(error){
        return {"response": error.message , "status": false}; 
    }
}

async function changePassword(email, password) { //update

    try{
        //update logic here
    }
    catch(error){
        return {"response": error.message}; 
    }
}

module.exports = {
    createUser,
    userAuthenticate
}