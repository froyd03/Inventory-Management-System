const express = require('express');
const router = express.Router();
const transactionHistoryModel = require('../models/transactionHistoryModel.js')
const authorize = require('../middleware/roleMiddleware.js')
const authMiddleware = require("../middleware/authMiddleware.js");
router.use(authMiddleware);

router.get('/', authorize(["admin", "manager", "staff"]), async (req, res) => {
    
    try{
        const data = await transactionHistoryModel.getAllHistory();
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
});

router.get('/reportData', authorize(["admin", "manager"]), async (req, res) => {
    
    try{
        const data = await transactionHistoryModel.getAllHistory();
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
});

router.get('/getReportData', authorize(["admin", "manager"]), async (req, res) => {
    
    try{
        const { startDate, endDate, reportType} = req.query;
        const data = await transactionHistoryModel.getReportData(startDate, endDate, reportType);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
});

module.exports = router;