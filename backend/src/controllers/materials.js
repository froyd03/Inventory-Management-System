// controllers/materialsController.js
const express = require('express');
const router = express.Router();
const materialService = require('../models/materialModel.js');

router.get('/', async (req, res) => {
    try {
        const data = await materialService.getAllMaterials();
        res.status(200).json(data);

    } catch (error) {

        res.status(400).json({ message: `Error getting materials: ${error}` });
    }

});

router.get('/:filterType', async (req, res) => {
    try {
        const filterType = req.params.filterType;
        const data = await materialService.getMaterialsByFilter(filterType);
        res.status(200).json(data);

    } catch (error) {
        
        res.status(400).json({ message: `Error getting materials: ${error}` });
    }

});

router.get('/search/:name', async (req, res) => {
    
    try {
        const search = req.params.name;
        const data = await materialService.searchMaterials(search);
        res.status(200).json(data);

    } catch (error) {
        
        res.status(400).json({ message: `Error getting materials: ${error}` });
    }
});

router.post('/', async (req, res) => {

    try {
        const result = await materialService.addMaterial(req.body);
        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({ message: `Error adding material: ${error}` });
    }
});

router.post('/restock',  async (req, res) => {

    try {
        const result = await materialService.restockMaterial(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Restock Material Error:", error); 
        res.status(400).json({ message: `Error restocking materials: ${error.message}` });
    }

});

module.exports = router;