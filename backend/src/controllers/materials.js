// controllers/materialsController.js
const materialService = require('../services/materialService.js');

const getMaterials = async (req, res) => {
    try {
        const data = await materialService.getAllMaterials();
        res.status(200).json(data);

    } catch (error) {

        res.status(400).json({ message: `Error getting materials: ${error}` });
    }

};

const getMaterialbyFilter = async (req, res) => {
    try {
        const filterType = req.params.filterType;
        const data = await materialService.getMaterialsByFilter(filterType);
        res.status(200).json(data);

    } catch (error) {
        
        res.status(400).json({ message: `Error getting materials: ${error}` });
    }

};

const searchMaterial = async (req, res) => {
    
    try {
        const search = req.params.name;
        const data = await materialService.searchMaterials(search);
        res.status(200).json(data);

    } catch (error) {
        
        res.status(400).json({ message: `Error getting materials: ${error}` });
    }
}

const addMaterial = async (req, res) => {

    try {
        const result = await materialService.addMaterial(req.body);
        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({ message: `Error adding material: ${error}` });
    }
};

const restockMaterial = async (req, res) => {

    try {
        const result = await materialService.restockMaterial(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Restock Material Error:", error); 
        res.status(400).json({ message: `Error restocking materials: ${error.message}` });
    }

};

module.exports = {
  getMaterials,
  getMaterialbyFilter,
  searchMaterial,
  addMaterial,
  restockMaterial
};
