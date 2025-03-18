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
        $userID = $_SESSION["id"];

        include("../index.php");

        $products = new Product();

        echo json_encode([
            "products" => $products->getProducts("products", "../config/database.php"),
            "materials" => $products->getProducts("materials", "../config/database.php"),
        ]);
    }

}

?>