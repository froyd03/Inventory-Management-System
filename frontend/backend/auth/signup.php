
<?php

  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST");
  header("Content-Type: Application/json");

  function validatePassword($password) {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    $pattern = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/";;
    
    if (preg_match($pattern, $password)) {
        return true; // Password is valid
    } else {
        return false; // Password is invalid
    }
  }

  include("../config/database.php");

  if($_SERVER["REQUEST_METHOD"] === "POST"){
      if(empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["password"])){
        echo json_encode(["message" => "complete all input fields before submitting."]);
        exit;
      }else{
        $name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
        $email= filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
        $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
        $hash = "";
        
        if(validatePassword($password)){
          $hash = password_hash($password, PASSWORD_DEFAULT);
        }else{
          echo json_encode(["message" => "Follow the criteria above."]);
          exit;
        }
        
        try{
          $sql = "INSERT INTO users (name, email, password) 
          VALUES('{$name}', '{$email}', '{$hash}');";

          $isSuccess = mysqli_query($connection, $sql);

          if($isSuccess){
            echo json_encode(["confirm" => "success"]);
          }
        }catch(mysqli_sql_exception $e){
          echo json_encode(["message" => "email is already registered. try again"]);
        }
        
        mysqli_close($connection);
      }
    }
?>