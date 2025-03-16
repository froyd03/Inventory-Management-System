<?php

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET");
    header("Content-Type: Application/json");

    session_start();

    if(isset($_SESSION["isAuthenticated"]) && isset($_SESSION["id"])){
        echo json_encode([
            "isRedirect" => $_SESSION["isAuthenticated"], 
            "id" => $_SESSION["id"]
        ]);
    }else{
        echo json_encode([
            "isRedirect" => false, 
            "id" => null
        ]);
    }
?>