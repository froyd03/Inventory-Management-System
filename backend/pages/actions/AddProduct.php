<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if (!isset($_SESSION["id"])) {
        echo json_encode(["message" => "User not authenticated",]);
        exit;
    }else if(empty($_POST["productName"])
            || empty($_POST["productId"]) 
            || empty($_POST["sellingPrice"])){
        echo json_encode(["message" => "Complete all fields before submitting."]);
        exit;
    }else{
        include("../../config/database.php");

        $productName = filter_input(INPUT_POST, "productName", FILTER_SANITIZE_STRING);
        $productID = filter_input(INPUT_POST, "productId", FILTER_SANITIZE_STRING);
        $sellingPrice = filter_input(INPUT_POST, "sellingPrice", FILTER_SANITIZE_NUMBER_INT);  
        
        try {
            
            $stmt = $connection->prepare("INSERT INTO products(name, price, quantity, availability) VALUES (?, ?, 0, 'out of stock')");
            $stmt->bind_param("ss", $productName, $sellingPrice);
            $isSuccess = $stmt->execute();
        
            if ($isSuccess) {
                $sqlGet = "SELECT PID FROM products WHERE name = '{$productName}'";
                $productResults = mysqli_query($connection, $sqlGet);
        
                if (mysqli_num_rows($productResults) == 1) {
                    $rowProductsTbl = mysqli_fetch_assoc($productResults);
                    $prodID = $rowProductsTbl["PID"];
        
                    // Decode JSON
                    $materials = $_POST["materials"];
                    $materialDecode = json_decode($materials);
        
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        echo json_encode(["message" => "Invalid JSON: " . json_last_error_msg()]);
                        exit;
                    }
        
                    // Insert materials
                    $response = ["message" => "success!"];
        
                    foreach ($materialDecode as $materialItem) {
                        $material = $materialItem->materialName;
                        $quantity = $materialItem->quantity;
        
                        $result = mysqli_query($connection, "SELECT MID FROM materials WHERE name = '{$material}'");
                        $rowMaterialsTbl = mysqli_fetch_assoc($result);
        
                        if (!$rowMaterialsTbl) {
                            $response["message"] = "Material '$material' not found!";
                            break;
                        }
        
                        $materialId = $rowMaterialsTbl["MID"];
        
                        $sqlInsertProductResult = "INSERT INTO product_materials(PID, MID, quantity) VALUES('{$prodID}', '{$materialId}', '{$quantity}')";
                        $isInsertSuccess = mysqli_query($connection, $sqlInsertProductResult);
        
                        if (!$isInsertSuccess) {
                            $response["message"] = "Failed to insert material '$material'";
                            break;
                        }
                    }
        
                    echo json_encode($response); // Send JSON only once
                }
            }
        } catch (mysqli_sql_exception $e) {
            echo json_encode(["message" => $e->getMessage()]);
            exit;
        }
        
    }
}
?>