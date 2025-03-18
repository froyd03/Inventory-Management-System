<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET");
    header("Content-Type: Application/json");

    include("session.php");

    session_destroy();
?>