<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

function getDataFromTables($sqlCommand){
    include("../config/database.php");

    try {
        $result = mysqli_query($connection, $sqlCommand);

        if (!$result || mysqli_num_rows($result) == 0) {
            return ["error" => "no data found"];
        }

        return mysqli_fetch_assoc($result);
    } catch (mysqli_sql_exception $e) {
        return ["error" => $e->getMessage()];
    }
}

if($_SERVER["REQUEST_METHOD"] == "GET"){
    
    if (!isset($_SESSION["id"])) {
        echo json_encode(["error" => "User not authenticated"]);
        exit;
    }
    $userID = $_SESSION["id"];

    $sql_tblSales = "SELECT sales, revenue, profit FROM sales_overview WHERE id = '$userID'";
    $sql_tblPurchase = "SELECT purchase, cost, retrn FROM purchase_overview WHERE id = '$userID'";

    $result_tblSales = getDataFromTables($sql_tblSales);
    $result_tblPurchase = getDataFromTables($sql_tblPurchase);

    echo json_encode([
        "salesOverview" => $result_tblSales,
        "purchaseOverview" => $result_tblPurchase
    ]);
}
?>
