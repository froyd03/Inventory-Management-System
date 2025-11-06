const productService = require('../services/productsService.js')

const getProduct = async (req, res) => {
    
    try{
        const data = await productService.getAllProducts();
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
}

const searchProduct = async (req, res) => {
        
    try{
        const search = req.params.name;
        const data = await productService.searchProduct(search);
        res.status(200).json(data);
        
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
}

const getProductByFilter = async (req, res) => {

    try{
        const filter = req.params.filterType;
        const data = await productService.getProductsByFilter(filter);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
}

const addProduct = async (req, res) => {

    try{
        const requestData = req.body;
        const data = await productService.addProduct(requestData);
        res.status(201).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
}

const restockProduct = async (req, res) => {

    try{
        const requestData = req.body;
        const data = await productService.restockProduct(requestData);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error restocking products: ${error}`});
    }
}

const soldProduct = async (req, res) => {

    try{
        const requestData = req.body;
        const data = await productService.soldProduct(requestData);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
}

const getDetailsProductSold = async (req, res) => {
    const quantity = parseInt(req.params.quantity);
    const productName = req.params.name;
    
    try{
        const data = await productService.soldProductDetails(productName, quantity);
        res.status(200).json(data);
    
    }catch(error){

        res.status(400).json({message: `Error getting products: ${error}`});
    }
}

module.exports = {
    getProduct,
    searchProduct,
    getProductByFilter,
    addProduct,
    restockProduct,
    getDetailsProductSold,
    soldProduct
}