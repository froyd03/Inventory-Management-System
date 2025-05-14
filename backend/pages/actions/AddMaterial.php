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
    }else if(empty($_POST["materialName"])
            || empty($_POST["buyingPrice"]) 
            || empty($_POST["supplierName"])
            || empty($_POST["email"])
            || empty($_POST["contactNumber"])
            || empty($_POST["supplierType"])){
        echo json_encode(["message" => "Complete all fields before submitting."]);
        exit;
    }else{
        include("../../config/database.php");

        $materialName = filter_input(INPUT_POST, "materialName", FILTER_SANITIZE_STRING);
        $buyingPrice = filter_input(INPUT_POST, "buyingPrice", FILTER_SANITIZE_NUMBER_INT);
        $supplierName = filter_input(INPUT_POST, "supplierName", FILTER_SANITIZE_STRING);  
        $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_STRING);  
        $contactNumber = filter_input(INPUT_POST, "contactNumber", FILTER_SANITIZE_STRING);  
        $supplierType = filter_input(INPUT_POST, "supplierType", FILTER_SANITIZE_STRING);  
        
        try {
            $stmt = $connection->prepare("INSERT INTO materials(name, price, quantity, availability) VALUES (?, ?, 0, 'Out of stock')");
            $stmt->bind_param("ss", $materialName, $buyingPrice);
            $isSuccess = $stmt->execute();
        
            if ($isSuccess) {
                $sqlGet = "SELECT MID FROM materials WHERE name = '{$materialName}'";
                $productResults = mysqli_query($connection, $sqlGet);
        
                if (mysqli_num_rows($productResults) == 1) {
                    $rowMaterialsTbl = mysqli_fetch_assoc($productResults);
                    $materialID = $rowMaterialsTbl["MID"];
        
                    // Insert suppliers
                    $response = ["message" => "prociessing"];
                    $sqlInsertMaterialResult = "INSERT INTO supplier(MID, name, email, contact_number, supplier_type) VALUES('{$materialID}', '{$supplierName}', '{$email}', '{$contactNumber}', '{$supplierType}')";

                    $isInsertSuccess = mysqli_query($connection, $sqlInsertMaterialResult);
    
                    if (!$isInsertSuccess) {
                        $response["message"] = "Failed to insert material '$material'";
                        exit;
                    }else{
                        $response["message"] = "success!";
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