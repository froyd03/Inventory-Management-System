<?php 
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
include("../../config/database.php");
    
if($_SERVER["REQUEST_METHOD"] == "POST"){

    if (!isset($_SESSION["id"])) {
        echo json_encode(["error" => "User not authenticated"]);
        exit;
    }else{
        if(!empty($_POST["totalQuantity"])){
            //update purchase & cost value from purchase_overview table
            $purchase_overview = mysqli_query($connection, "SELECT purchase, cost FROM purchase_overview");
            $fetchedPurchase = mysqli_fetch_assoc($purchase_overview);
    
            $updatedPurchase = $_POST["totalQuantity"];
            $updatedPurchase += $fetchedPurchase["purchase"];
    
            $updatedCost = $_POST["totalPrice"];
            $updatedCost += $fetchedPurchase["cost"];

            mysqli_query($connection, "UPDATE purchase_overview SET purchase = $updatedPurchase, cost = $updatedCost WHERE id = 1");
            
            //update the quantity value to materials
            $productName = $_POST["productName"];
            $fetchedMaterial = mysqli_query($connection, "SELECT MID, quantity, availability FROM materials WHERE name = '$productName'");
            
            $material = mysqli_fetch_assoc($fetchedMaterial);
            $updatedQuantity = $material["quantity"] + $_POST["totalQuantity"];

            $availabilityStatus = "";
            if($updatedQuantity > 20){
                $availabilityStatus = "In-stock";
            }else if($updatedQuantity <= 20){
                $availabilityStatus = "Low stock";
            }else{
                $availabilityStatus = "Out of stock";
            }
           
            $materialID = $material["MID"];
            mysqli_query($connection, "UPDATE materials SET quantity = '$updatedQuantity', availability = '$availabilityStatus' WHERE MID = $materialID");
            echo "success";

            $stmt = $connection->prepare("INSERT INTO orders(name, order_value, quantity, per_quantity, order_ID, status) VALUES (?, ?, ?, ?, 8192, 'processing')");
            $stmt->bind_param("ssss", $productName, $_POST["totalPrice"], $_POST["totalQuantity"], $_POST["pricePerQuantity"]);
            $isSuccess = $stmt->execute();
        }else{
            echo "please put the quantity before placing order.";
        }
        
    }
    mysqli_close($connection);
}


?>