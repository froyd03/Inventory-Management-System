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
    }else if(empty($_POST["quantitySold"])
            || empty($_POST["revenue"]) 
            || empty($_POST["profit"])
            ){
        echo json_encode(["message" => "Complete all fields before submitting."]);
        exit;
    }else{
        include("../../config/database.php");

        $totalQuantitySold = filter_input(INPUT_POST, "quantitySold", FILTER_SANITIZE_STRING);
        $revenue = filter_input(INPUT_POST, "revenue", FILTER_SANITIZE_NUMBER_INT);
        $profit = filter_input(INPUT_POST, "profit", FILTER_SANITIZE_STRING);  
        
        try {
            $sqlGetSales = "SELECT sales, revenue, profit FROM sales_overview";
            $getSalesResult = mysqli_query($connection, $sqlGetSales);
            $rowSales = mysqli_fetch_assoc($getSalesResult);

            $totalQuantitySold += $rowSales["sales"];
            $revenue += $rowSales["revenue"];
            $profit += $rowSales["profit"];
           
            $stmtUpdateSales = $connection->prepare("UPDATE sales_overview SET sales=?, revenue=?, profit=? WHERE id = '1'");
            $stmtUpdateSales->bind_param("sss", $totalQuantitySold, $revenue, $profit);
            $isSuccessUpdateSales = $stmtUpdateSales->execute();

            $productName = $_POST["productName"];
            $totalProductQuantity = $_POST["productQuantity"] - $_POST["quantitySold"];

            $stmtUpdateQuantity = $connection->prepare("UPDATE products SET quantity=? WHERE name=?");
            $stmtUpdateQuantity->bind_param("ss", $totalProductQuantity, $productName);
            $isSuccessUpdateQuantity = $stmtUpdateQuantity->execute();

            if ($isSuccessUpdateSales && $isSuccessUpdateQuantity) {
              echo json_encode(["message" => "success!"]);
            }else{
                echo json_encode(["message" => "error! cannot sold product"]);
            }
            
        } catch (mysqli_sql_exception $e) {
            echo json_encode(["message" => $e->getMessage()]);
            exit;
        }
        
    }
}
?>