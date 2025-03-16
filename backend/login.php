
<?php 
  session_start();
  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST");
  header("Content-Type: Application/json");
  include("database.php");
  
  if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(isset($_POST["email"]) && isset($_POST["password"])){
      
      $email= filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
      $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
      
      $sql = "SELECT * FROM register WHERE email = '{$email}'";
      $result = mysqli_query($connection, $sql);
      $row = mysqli_fetch_assoc($result);
        
      if(password_verify($password, $row["password"])){
        echo json_encode(["isAuthenticated" => true]);
        $_SESSION["isAuthenticated"] = true;
        $_SESSION["id"] = $row["id"];
      }else{
        echo json_encode(["error" => "Incorrect username & password."]);
      }
    
    }else{
      echo json_encode(["error" => "Complete all fields before submitting."]);
    }
  }
  
?>