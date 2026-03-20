const express = require('express');
const router = express.Router();
const productService = require('../models/productsModel.js')
const authorize = require('../middleware/roleMiddleware.js')
const authMiddleware = require("../middleware/authMiddleware.js");
router.use(authMiddleware);

router.get('/', authorize(["admin", "manager", "staff"]), async (req, res) => {
    
    try{
        const data = await productService.getAllProducts();
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
});

router.get('/search/:name', authorize(["admin", "manager", "staff"]), async (req, res) => {
        
    try{
        const search = req.params.name;
        const data = await productService.searchProduct(search);
        res.status(200).json(data);
        
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
});

router.get('/:filterType', authorize(["admin", "manager", "staff"]), async (req, res) => {

    try{
        const filter = req.params.filterType;
        const data = await productService.getProductsByFilter(filter);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
});

router.post('/', authorize(["admin", "manager"]), async (req, res) => {

    try{
        const requestData = req.body;
        const data = await productService.addProduct(requestData);
        res.status(201).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
});

router.post('/restock', authorize(["admin", "manager", "staff"]), async (req, res) => {

    try{
        const requestData = req.body;
        const data = await productService.restockProduct(requestData);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error restocking products: ${error}`});
    }
});

router.post('/sellProduct', authorize(["admin", "manager", "staff"]), async (req, res) => {

    try{
        const requestData = req.body;
        const data = await productService.soldProduct(requestData);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
}
);

router.get('/:name/:quantity', authorize(["admin", "manager", "staff"]), async (req, res) => {
    const quantity = parseInt(req.params.quantity);
    const productName = req.params.name;
    
    try{
        const data = await productService.soldProductDetails(productName, quantity);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
});

module.exports = router;