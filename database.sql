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
    name VARCHAR(25) UNIQUE,
    price INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    availability VARCHAR(25) NOT NULL
);

CREATE TABLE products (
    PID INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) UNIQUE,
    price INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    unit_type VARCHAR(5) NOT NULL,
    availability VARCHAR(25) NOT NULL
);

CREATE TABLE product_materials (
   PID INT(11),
   MID INT(11),
   quantity INT NOT NULL,
   FOREIGN KEY(PID) REFERENCES products(PID) ON DELETE CASCADE,
   FOREIGN KEY(MID) REFERENCES materials(MID) ON DELETE CASCADE
);

CREATE TABLE production(
    INPID INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(225) NOT NULL,
    time_left TIME DEFAULT CURRENT_TIME(),
    quantity INT(11) NOT NULL
);

INSERT INTO products (
    name, price, quantity, availability
) VALUES
    ("Chair", 250, 20, "In-stock"),
    ("Table", 100, 35, "In-stock"),
    ("Screw", 100, 35, "Low stock"),
    ("Organizer", 150, 0, "Out of stock");

INSERT INTO materials (
    name, price, quantity, availability
) VALUES 
    ("Wood Plank", 25, 43, "In-stock"),
    ("Screws", 5, 55, "In-stock"),
    ("Wooden Glue", 15, 0, "Out of stock"),
    ("Barnish", 15, 12, "Low stock");


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
        (2, 3, 95),
        (2, 1, 45),
        (3, 2, 25);

SELECT products.name, materials.name FROM product_materials
JOIN products ON product_materials.PID = products.PID
JOIN materials on product_materials.MId = materials.MID