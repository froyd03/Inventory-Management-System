<?php
    
    class Product {
        private $name, $price, $quantity, $availability, $expiration_date;

        public function setProducts($name, $price, $quantity, $availability){
            $this->name = $name;
            $this->price = $price;
            $this->quantity = $quantity;
            $this->availability = $availability;
        }

        public function add($tbl_name, $db_connection, $column1, $column2, $column3, $column4){
            include($db_connection);
            $sql = "INSERT INTO $tbl_name ($column1,  $column2,  $column3,  $column4) VALUES
            ('{$this->name}', '{$this->price}', '{$this->quantity}', '{$this->availability}')";

            try{
                $isSuccess = mysqli_query($connection, $sql);
                return $isSuccess;
            }catch(mysqli_sql_exception $e){
                echo json_encode(["message" => $e->getMessage()]);
            }
            mysqli_close($connection);
        }

        public function getProducts($db_name, $db_connection){
            include($db_connection);
            $sql= "SELECT * FROM $db_name";

            try {
                $result = mysqli_query($connection, $sql);
        
                if (!$result || mysqli_num_rows($result) == 0) {
                    return;
                }else{
                    $materials = [];
                    while($row = mysqli_fetch_assoc($result)){
                        $materials[] = [
                            "name" => $row["name"],
                            "price" => $row["price"],
                            "quantity" => $row["quantity"],
                            "availability" => $row["availability"]
                        ];
                    }
                    return $materials;
                }
            } catch (mysqli_sql_exception $e) {
                return ["error" => $e->getMessage()];
            }
        }
/*
        protected sold(){

        }*/
    }

    class Material extends Product {
        /*
        function startProduction(){

        }

        function placeOrder(){

        }*/
    }

?>