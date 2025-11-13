const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware.js");
const userModel = require('../models/userModel.js')

router.get("/verifyUserToken", auth, async (req, res) => {
    res.status(200).json({ isValid: true, user: req.user });
});

router.post("/register", async (req, res) => {
    try{

        const {name, email, password} = req.body;
        const result = await userModel.createUser(name, email, password);
        res.status(201).json(result);  
    }
    catch(error){

        res.status(401).json({response: error.message});  
    }
});

router.post("/login", async (req, res) => {
    try{

        const {email, password} = req.body;
        const result = await userModel.userAuthenticate(email, password);
        res.status(200).json(result);
    }
    catch(error){

        res.status(200).json({response: error.message});  
    }
});

module.exports = router; 