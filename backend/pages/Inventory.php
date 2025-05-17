<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

if($_SERVER["REQUEST_METHOD"] == "GET"){
    
    if (!isset($_SESSION["id"])) {
        echo json_encode(["error" => "User not authenticated"]);
        exit;
    }else{
        include("../index.php");
        include("../config/database.php");
        $userID = $_SESSION["id"];

        $sql = 
            "SELECT 
                supplier.name AS supplier_name, 
                supplier.email, 
                materials.name, 
                supplier.contact_number, 
                materials.name AS material_name, 
                materials.price,
                materials.brand,
                materials.quantity, 
                materials.measure_type,
                materials.availability 
            FROM supplier INNER JOIN materials ON materials.MID = supplier.MID;";
        $materials = [];

        try {
            $result = mysqli_query($connection, $sql);
    
            if (!$result || mysqli_num_rows($result) == 0) {
                exit;
            }else{
                while($row = mysqli_fetch_assoc($result)){
                    $materials[] = [
                        "name" => $row["material_name"],
                        "brand" => $row["brand"],
                        "price" => $row["price"],
                        "quantity" => $row["quantity"],
                        "measure_type" => $row["measure_type"],
                        "availability" => $row["availability"],
                        "supplierDetails" => [
                            "name" => $row["supplier_name"],
                            "email" => $row["email"],
                            "contactNumber" => $row["contact_number"]
                        ]
                    ];
                }
                $products = new Product();
                echo json_encode([
                    "products" => $products->getProducts("products", "../config/database.php"),
                    "materials" => $materials,
                ]);
            }
        } catch (mysqli_sql_exception $e) {
            return ["error" => $e->getMessage()];
        }
    }

}

?>