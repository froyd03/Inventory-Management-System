const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const router = express.Router();
const database = require("../config/database.js");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authMiddleware.js");

router.get("/verifyUserToken", auth, async (req, res) => {
    res.status(200).json({ isValid: true, user: req.user });
})

router.post("/register", async (req, res) => {
    try{
        const {name, email, password} = req.body;
    
        await database.query(
            "INSERT INTO users(name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        )

        const [user] = await database.query("SELECT * FROM users WHERE email = ?", [email]);

         //generate JWT webtoken
        const payload = {_id: user[0].id, email: user[0].email};
        const token = jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "1h"});

        res.status(201).json({response: token});  
    }
    catch(error){
        res.status(401).json({response: error.message});  
    }
})

router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        const [user] = await database.query("SELECT * FROM users WHERE email = ?", [email]);

        if(email === user[0].email && password === user[0].password){

            const payload = {_id: user[0].id, email: user[0].email};
            const token = jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "1h"});

            if(token) return res.status(200).json({response: token, status: true});  
            else throw new Error("Error login! no token");
        }else{
            return res.status(201).json({response: "email or password incorrect", status: false}); 
        }
    }
    catch(error){
        res.status(201).json({response: error.message});  
    }
})

module.exports = router; 