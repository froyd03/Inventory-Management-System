DROP DATABASE IF EXISTS inventory_system;
CREATE DATABASE inventory_system;
USE inventory_system;

CREATE TABLE users (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(25) UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE sales_overview (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    sales INT(11) NOT NULL,
    revenue INT(11) NOT NULL,
    profit INT(11) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE purchase_overview (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    purchase INT(11) NOT NULL,
    cost INT(11) NOT NULL,
    retrn INT(11) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materials (
    MID INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    price INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    availability VARCHAR(25) NOT NULL
);

CREATE TABLE products (
    PID INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    price INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    availability VARCHAR(25) NOT NULL
);

CREATE TABLE product_materials (
   PID INT(11),
   MID INT(11),
   quantity INT NOT NULL,
   FOREIGN KEY(PID) REFERENCES products(PID),
   FOREIGN KEY(MID) REFERENCES materials(MID)
);

INSERT INTO products (
    name, price, quantity, availability
) VALUES
    ("Chair", 250, 20, "in-Stock"),
    ("Table", 100, 35, "in-Stock"),
    ("Organizer", 150, 0, "out of stock");

INSERT INTO materials (
    name, price, quantity, availability
) VALUES 
    ("Wood Plank", 25, 43, "in-Stock"),
    ("Screws", 5, 55, "in-Stock"),
    ("Wooden Glue", 15, 0, "out of stock"),
    ("Barnish", 15, 12, "in-stock");


INSERT INTO sales_overview (
    sales, revenue, profit
) VALUES (0, 0, 0);

INSERT INTO purchase_overview (
    purchase, cost, retrn
) VALUES (0, 0, 0);


INSERT INTO product_materials(PID, MID, quantity)
VALUES  (1, 1, 15), 
		(1, 3, 80), 
        (1, 4, 53), 
        (2, 1, 45),
        (2, 3, 95);
        (2, 1, 45);
        (3, 2, 25);

SELECT products.name, materials.name FROM product_materials
JOIN products ON product_materials.PID = products.PID
JOIN materials on product_materials.MId = materials.MID