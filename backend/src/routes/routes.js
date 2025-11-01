const express = require('express');
const router = express.Router();

const {
    getProduct, 
    searchProduct, 
    getProductByFilter,
    soldProduct,
    getDetailsProductSold,
    addProduct
} = require('../controllers/products.js');

const {
    getMaterials, 
    getMaterialbyFilter, 
    searchMaterial, 
    addMaterial, 
    restockMaterial
} = require('../controllers/materials.js');

router.get('/materials', getMaterials);
router.get('/materials/search/:name', searchMaterial);
router.get('/materials/:filterType', getMaterialbyFilter);
router.post('/materials', addMaterial);
router.post('/material/restock', restockMaterial);



router.get('/products', getProduct);
router.get('/products/search/:name', searchProduct);
router.get('/products/:filterType', getProductByFilter);

router.post('/products', addProduct);
router.get('/products/:name/:quantity', getDetailsProductSold);
router.post('/products/sellProduct', soldProduct);


module.exports = router;