const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const router = express.Router();
const database = require("../config/database.js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;
    
        await database.query(
            "INSERT INTO users(name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        )

        const [user] = await database.query("SELECT * FROM users WHERE email = ?", [email]);

         //generate JWT webtoken
        const jwtData = {_id: user[0].id, name: user[0].name};
        const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "1h"});

        res.status(201).json({message: token});  
    }
    catch(error){
        res.status(401).json({message: error.message});  
    }
})

router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        const [user] = await database.query("SELECT * FROM users WHERE email = ?", [email]);

        if(email === user[0].email && password === user[0].password){

            const jwtData = {_id: user[0].id, name: user[0].name};
            const token = jwt.sign(jwtData, process.env.JWTSECRET, {expiresIn: "1h"});
            return res.status(201).json({message: token});  
        }else{

            return res.status(201).json({message: "email or password incorrect"}); 
        }
    }
    catch(error){
        res.status(201).json({message: error.message});  
    }
})

module.exports = router; 