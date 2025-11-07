// services/materialService.js
const database = require('../config/database.js');

async function getAllMaterials() {
    const sql = `
        SELECT 
        supplier.name AS supplier_name, 
        supplier.email, 
        supplier.contact_number, 
        materials.name AS material_name, 
        materials.price, 
        materials.brand, 
        materials.quantity, 
        materials.measure_type, 
        materials.availability 
        FROM supplier 
        INNER JOIN materials ON materials.MID = supplier.MID;
    `;
    const [rows] = await database.query(sql);
    return rows;
}

async function searchMaterials(findMaterial){

    const materials = await getAllMaterials();

    const materialFound = materials.filter(material => 
        material.material_name.toLowerCase().startsWith(findMaterial.toLowerCase()) ||
        material.brand.toLowerCase().startsWith(findMaterial.toLowerCase())
    );

    return materialFound;
}

async function getMaterialsByFilter(filterType) {
    const materials = await getAllMaterials();

    const filteredMaterial = materials.filter(material => 
        material.availability.toLowerCase() === filterType.toLowerCase()
    );

    return filteredMaterial;
}

async function addMaterial(materialData) {
    const {
        materialName, 
        buyingPrice, 
        supplierName, 
        email, 
        contactNumber, 
        supplierType, 
        measurementType, 
        brandName
    } = materialData;

    const sqlMaterial = `
        INSERT INTO materials(name, brand, price, quantity, measure_type, availability) 
        VALUES (?, ?, ?, 0, ?, 'Out of stock')
    `;

    const [materialResult] = await database.query(sqlMaterial, [
        materialName, 
        brandName, 
        buyingPrice, 
        measurementType
    ]);

    const [materialIdRow] = await database.query(
        "SELECT MID FROM materials WHERE name = ?", 
        [materialName]
    );

    const sqlSupplier = `
        INSERT INTO supplier(MID, name, email, contact_number, supplier_type)
        VALUES(?, ?, ?, ?, ?)
    `;

    await database.query(sqlSupplier, [
        materialIdRow[0].MID, 
        supplierName, 
        email, 
        contactNumber, 
        supplierType
    ]);

    return { message: "success!" };
}

async function restockMaterial({ totalPrice, totalQuantity, pricePerQuantity, productName }) {
    // 1. Update purchase_overview
    const [overviewRows] = await database.query("SELECT purchase, cost FROM purchase_overview WHERE id = 1");
    const updatedPurchase = parseFloat(overviewRows[0].purchase) + parseFloat(5);
    const updatedCost = parseFloat(overviewRows[0].cost) + parseFloat(15);

    await database.query(
        "UPDATE purchase_overview SET purchase = ?, cost = ? WHERE id = 1",
        [updatedPurchase, updatedCost]
    );

    // 2. Update materials quantity
    const [materialRows] = await database.query("SELECT MID, quantity FROM materials WHERE name = ?", [productName]);
    const updatedQuantity = parseFloat(materialRows[0].quantity) + parseFloat(totalQuantity);
    
    const availabilityStatus = (updatedQuantity === 0) 
            ? 'Out of Stock' : (updatedQuantity < 20) 
            ? 'Low stock' : 'In-Stock';

    await database.query(
        "UPDATE materials SET quantity = ?, availability = ? WHERE MID = ?",
        [updatedQuantity, availabilityStatus, materialRows[0].MID]
    );

    // 3. Create order
    await database.query(
        "INSERT INTO orders (name, order_value, quantity, per_quantity, order_ID, status) VALUES (?, ?, ?, ?, 8192, 'processing')",
        [productName, totalPrice, totalQuantity, pricePerQuantity]
    );

    return { message: "success!" };
}

module.exports = {
    getAllMaterials,
    searchMaterials,
    getMaterialsByFilter,
    addMaterial,
    restockMaterial
};