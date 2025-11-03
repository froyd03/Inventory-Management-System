const database = require('../config/database.js');

async function getAllProducts(){
    const [products] = await database.query("SELECT * FROM products");
    return products;
}

async function searchProduct(findProduct){
    const products = await getAllProducts();
    
    const productFound = products.filter(product => 
        product.name.toLowerCase().startsWith(findProduct.toLowerCase())
    );

    return productFound;
}

async function getProductsByFilter(filterType){
     const products = await getAllProducts();
    
    const filteredProducts = products.filter(product => 
        product.availability.toLowerCase() === filterType.toLowerCase()
    );

    return filteredProducts;
}

async function addProduct({productName, sellingPrice, measurementType, materials}){
    const connection = await database.getConnection();

    try{
        await connection.beginTransaction();

        await connection.query( //1. insert new product
            "INSERT INTO products(name, price, quantity, unit_type, availability) VALUES (?, ?, 0, ?, 'Out of stock')",
            [productName, sellingPrice, measurementType]
        );
        
        const [productId] = await connection.query( //2. Get ID of product inserted above
            "SELECT PID FROM products WHERE name = ?",
            productName
        );

        materials.forEach(async (material) => { //3. insert all materials in table 1 by 1
            
            const [materialId] = await connection.query(
                "SELECT MID FROM materials WHERE name = ?",
                material.materialName
            );

            await connection.query(
                "INSERT INTO product_materials(PID, MID, quantity) VALUES(?, ?, ?)",
                [productId[0].PID, materialId[0].MID, material.quantity]
            );
        });
    }
    catch(error){
        await connection.rollback();
        return {"message": "Something went wrong! try again", "status": false};

    }
    finally{
        connection.release(); 
        return {"message": `success added material ${productName}!`, "status": true}
    }
}

async function restockProduct({productName, restockQuantity}){
    const connection = await database.getConnection();

    try{
        await connection.beginTransaction();

        const sqlGetProductFromMaterials = `
            SELECT 
                materials.name AS material_name, 
                products.quantity AS product_quantity,
                materials.quantity AS material_quantity,
                products.availability AS product_availability,
                materials.availability AS material_availability,
                product_materials.quantity AS required_quantity
            FROM product_materials
            JOIN products ON product_materials.PID = products.PID
            JOIN materials ON product_materials.MID = materials.MID 
            WHERE products.name = ?;
        `;
        const [productFromMaterials] = await connection.query(sqlGetProductFromMaterials, productName);

        //1. update product quantity and availability
        const totalProductQuantity = productFromMaterials[0].product_quantity + restockQuantity;
        const availabilityStatusProduct = (totalmaterialQuantity === 0) 
            ? 'Out of Stock' : (totalmaterialQuantity < 20) 
            ? 'Low stock' :'In-Stock';

        await connection.query(
            "UPDATE products SET quantity = ?, availability = ? WHERE name = ?", 
            [totalProductQuantity, availabilityStatusProduct, productName]
        );
    
        //2. update stocks of materials that used
        productFromMaterials.forEach(async (item) => {

            const [materialQuantity] = await connection.query(
                "SELECT quantity FROM materials WHERE name = ?", 
                [item.material_name]
            );
            const materialFromProductQuantity = item.required_quantity * restockQuantity;
            const totalmaterialQuantity = materialQuantity[0].quantity - materialFromProductQuantity;

            const availabilityStatus = (totalmaterialQuantity === 0) 
                ? 'Out of Stock' : (totalmaterialQuantity < 20) 
                ? 'Low stock' :'In-Stock';

            await connection.query(
                "UPDATE materials SET quantity = ?, availability = ? WHERE name = ?", 
                [totalmaterialQuantity, availabilityStatus, item.material_name]
            );
        });
    }
    catch(error){
        await connection.rollback();
    }
    finally{
        connection.release();
    }
   
}

async function soldProduct({productName, quantitySold}){
    const connection = await database.getConnection();
    
    const productSoldDetails = await soldProductDetails(productName, quantitySold);
    const quantityFromProduct = productSoldDetails.productQuantity;

    try{
        await connection.beginTransaction();
        
        if(quantityFromProduct < quantitySold){
            return {"message": `unable to sold product! Low quantity ${quantityFromProduct}.`};
        }

        //1. get sales values
        const [sales] = await connection.query("SELECT sales, revenue, profit FROM sales_overview");
        const totalQuantitySold = quantitySold + sales[0].sales;
        const totalRevenue = productSoldDetails.revenue + sales[0].revenue;
        const totalProfit = productSoldDetails.profit + sales[0].profit;

        //2. update sales with new value
        await connection.query(
            "UPDATE sales_overview SET sales = ?, revenue = ?, profit = ? WHERE id = 1",
            [totalQuantitySold, totalRevenue, totalProfit]
        );

        //3. update product quantity and status availability
        const totalProductQuantity = quantityFromProduct - quantitySold;
        
        const availabilityStatus = (totalProductQuantity === 0) 
            ? 'Out of Stock' : (totalProductQuantity < 20) 
            ? 'Low stock' :'In-Stock';

        await connection.query(
            "UPDATE products SET quantity = ?, availability = ? WHERE name = ?",
            [totalProductQuantity, availabilityStatus, productName]
        );
    }
    catch(error){
        await connection.rollback()
        return {"message": `Product ${productName} failed to sold!`, "status": false};
    }
    finally{
        connection.release();
    }
       
    return {"message": `Product ${productName} sold success!`, "status": true};
}

async function soldProductDetails(productName, quantitySold) { //this function for only displaying data

    const productFromMaterials = `
        SELECT 
            products.price AS product_price, 
            products.quantity AS productQuantity,
            materials.name, 
            product_materials.quantity, 
            materials.price 
        FROM product_materials
        JOIN products ON product_materials.PID = products.PID
        JOIN materials ON product_materials.MID = materials.MID 
        WHERE products.name = ?
    `;

    const [materials] = await database.query(productFromMaterials, productName);
    let costPerUnit = 0;
    
    materials.forEach(item => {costPerUnit += item.price * item.quantity})
    costPerUnit *= quantitySold;

    const productPrice = materials[0].product_price;
    const totalProductPrice = productPrice * quantitySold;
    const revenue = totalProductPrice;
    const profit = totalProductPrice - costPerUnit;

    return {
        "unitCost": costPerUnit, 
        "totalPrice": totalProductPrice, 
        "profit": profit,
        "revenue": revenue,
        "productQuantity": materials[0].productQuantity
    };
}

module.exports = {
    getAllProducts,
    searchProduct,
    getProductsByFilter,
    addProduct,
    soldProduct,
    soldProductDetails,
    restockProduct
}