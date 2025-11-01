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
        $product = $_POST["productName"];
        $timeLeft = $_POST["time_left"];

        $sql = "INSERT INTO production(name, quantity, time_left) VALUES('$product', 10, '$timeLeft')";

        mysqli_query($connection, $sql);
    }
    mysqli_close($connection);
}
?>