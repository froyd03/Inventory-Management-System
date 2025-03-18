
<?php 
  session_start();
  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST");
  header("Content-Type: Application/json");
  include("../config/database.php");
  
  if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(isset($_POST["email"]) && isset($_POST["password"])){
      
      $email= filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
      $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);     
      $sql = "SELECT * FROM users WHERE email = '{$email}'";
    
      try{
        $result = mysqli_query($connection, $sql);
        $row = mysqli_fetch_assoc($result);

        if(mysqli_num_rows($result) == 0){
          echo json_encode(["error" => "Incorrect username & password."]);
          exit;
        }else if(password_verify($password, $row["password"])){
          echo json_encode(["isAuthenticated" => true]);
          $_SESSION["isAuthenticated"] = true;
          $_SESSION["id"] = $row["id"];
        }else{
          echo json_encode(["error" => "Incorrect username & password."]);
        }

      }catch(mysqli_sql_exception $e){
        echo json_encode(["error" => $e]);
      }
    
    }else{
      echo json_encode(["error" => "Complete all fields before submitting."]);
    }
  }
  
?>