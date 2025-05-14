<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
    
if (!isset($_SESSION["id"])) {
    echo json_encode(["error" => "User not authenticated"]);
    exit;
}else{
    include("../config/database.php");
    
    $sqltbl_suppliers = "SELECT 
            supplier.name AS supplier_name, 
            materials.name AS material_name,
            supplier.contact_number, 
            supplier.email,
            supplier.supplier_type 
        FROM supplier INNER JOIN materials
        ON materials.MID = supplier.MID";

    $result = mysqli_query($connection, $sqltbl_suppliers);
    
    $suppliers = []; 
    while($rowSuppliers = mysqli_fetch_assoc($result)){
        $suppliers[] = [
            "supplierName" => $rowSuppliers["supplier_name"],
            "material" => $rowSuppliers["material_name"],
            "contactNumber" => $rowSuppliers["contact_number"],
            "email" => $rowSuppliers["email"],
            "supplierType" => $rowSuppliers["supplier_type"]
        ];
    }
    echo json_encode($suppliers);
}
?>