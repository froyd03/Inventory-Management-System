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

    $sql_tblSales = "SELECT sales, revenue, profit FROM sales_overview WHERE id = '1'";
    $result_tblSales = getDataFromTables($sql_tblSales);

    $sql_tblPurchase = "SELECT purchase, cost, retrn FROM purchase_overview WHERE id = '1'";
    $result_tblPurchase = getDataFromTables($sql_tblPurchase);

    include("../config/database.php");
    $sql_tblMaterials = "SELECT * FROM materials";
    $result_materials = mysqli_query($connection, $sql_tblMaterials);

    $quantity = 0;
    $lowStocks = [];
    while($row = mysqli_fetch_assoc($result_materials)){
        $quantity += $row["quantity"];

        if($row["quantity"] <= 20){
            $lowStocks[] = [
                "name" => $row["name"],
                "price" => $row["price"],
                "remainingQuantity" => $row["quantity"],
                "measure_type" => $row["measure_type"],
                "availability" => $row["availability"]
            ];
        }
    }

    $sql_tblSupplier = "SELECT * FROM supplier";
    $result_suppliers = mysqli_query($connection, $sql_tblSupplier);
    $totalData = mysqli_num_rows($result_suppliers);

    echo json_encode([
        "salesOverview" => $result_tblSales,
        "purchaseOverview" => $result_tblPurchase,
        "lowQuantityStock" => $lowStocks,
        "quantityInHand" =>  $quantity,
        "numOfSuppliers" => $totalData
    ]);
}
?>
