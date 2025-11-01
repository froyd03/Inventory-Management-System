<?php

    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET");
    header("Content-Type: Application/json");

    session_start();

    $auth = ["isRedirect" => false, "id" => null];

    if(isset($_SESSION["isAuthenticated"]) && isset($_SESSION["id"])){
        $auth["isRedirect"] = $_SESSION["isAuthenticated"];
        $auth["id"] = $_SESSION["id"];
    }

    echo json_encode($auth);
?>