<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");
include("../config/database.php");

    
if($_SERVER["REQUEST_METHOD"] == "GET"){
    if (!isset($_SESSION["id"])) {
        echo json_encode(["error" => "User not authenticated"]);
        exit;
    }else{
        
        $sqltbl_products = "SELECT PID, name FROM products";
        $resultProducts = mysqli_query($connection, $sqltbl_products);

        $products = [];
        while($rowProducts = mysqli_fetch_assoc($resultProducts)){
            $productID = $rowProducts["PID"];
            $sqltbl_materials = "SELECT materials.name, product_materials.quantity, materials.price FROM product_materials
                JOIN products ON product_materials.PID = products.PID
                JOIN materials ON product_materials.MID = materials.MID WHERE products.PID = $productID";

            $result_materials = mysqli_query($connection, $sqltbl_materials);
            
            $materials = []; 
            $costPerUnit = 0;
            while($rowMaterials = mysqli_fetch_assoc($result_materials)){
                $materials[] = [
                   "materialName" => $rowMaterials["name"],
                   "quantity" => $rowMaterials["quantity"],
                ];
                $costPerUnit += $rowMaterials["quantity"] * $rowMaterials["price"];
            }
            
            $products[] = [
                "PID" => $rowProducts["PID"],
                "productName" => $rowProducts["name"],
                "costPerUnit" => $costPerUnit,
                "materials" => $materials
            ];
        }
        echo json_encode($products);
        
    }
}

?>