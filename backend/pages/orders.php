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
        include("../config/database.php");
        $userID = $_SESSION["id"];

        $sql = "SELECT * FROM orders";
        $orders = [];

        try {
            $result = mysqli_query($connection, $sql);
    
            if (!$result || mysqli_num_rows($result) == 0) {
                exit;
            }else{
                while($row = mysqli_fetch_assoc($result)){
                    $orders[] = [
                        "name" => $row["name"],
                        "orderValue" => $row["order_value"],
                        "quantity" => $row["quantity"],
                        "perQuantity" => $row["per_quantity"],
                        "orderID" => $row["order_ID"],
                        "date" => $row["order_date"],
                        "status" => $row["status"],
                    ];
                }
                echo json_encode(["orders" => $orders]);
            }
        } catch (mysqli_sql_exception $e) {
            return ["error" => $e->getMessage()];
        }
    }

}

?>