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
    name VARCHAR(50) UNIQUE,
    price INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    availability VARCHAR(25) NOT NULL
);

CREATE TABLE products (
    PID INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE,
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
    name VARCHAR(50) NOT NULL,
    time_left TIME DEFAULT CURRENT_TIME(),
    quantity INT(11) NOT NULL
);

CREATE TABLE supplier(
    SID INT(11) PRIMARY KEY AUTO_INCREMENT,
    MID INT(11),
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    contact_number VARCHAR(11) NOT NULL,
    supplier_type VARCHAR(20) NOT NULL,
    FOREIGN KEY(MID) REFERENCES materials(MID)
);

INSERT INTO products (
    name, price, quantity, availability
) VALUES
    ("Chair", 250, 20, "In-stock"),
    ("Table", 500, 35, "In-stock"),
    ("Desk", 300, 18, "Low stock"),
    ("Shelves", 100, 35, "In-stock"),
    ("Picture Frame", 75, 0, "Out of stock");

INSERT INTO materials (
    name, price, quantity, availability
) VALUES 
    ("Wood Plank", 25, 43, "In-stock"),
    ("Screws", 5, 55, "In-stock"),
    ("Wooden Glue", 12, 0, "Out of stock"),
    ("varnish", 15, 12, "Low stock"),
    ("Finishing Nails", 5, 55, "In-stock"),
    ("Box Nails", 7, 12, "Low stock");

INSERT INTO supplier (
    MID, name, email, contact_number, supplier_type 
) VALUES
    (3, "John Doe", "doejames@gmail.com", "0912345678", "taking returns"),
    (1, "David Gonzales", "richard@gmail.com", "0912345678", "not taking returns"),
    (4, "Ian James", "Martin@gmail.com", "0912345678","taking returns"),
    (2, "Christian Lee", "richard@gmail.com", "0912345678", "taking returns"),
    (5, "John Benedict", "benedictt@gmail.com", "0912345678", "taking returns"),
    (6, "Rose Mary", "roseee@gmail.com", "0912345678", "not taking returns");

INSERT INTO sales_overview (
    sales, revenue, profit
) VALUES (0, 0, 0);

INSERT INTO purchase_overview (
    purchase, cost, retrn
) VALUES (0, 0, 0);


INSERT INTO product_materials(PID, MID, quantity)
VALUES  (1, 1, 4), 
		(1, 3, 4), 
        (1, 4, 3), 
        (2, 1, 6),
        (2, 3, 4),
        (2, 2, 2),
        (3, 1, 7),
        (3, 5, 15),
        (3, 4, 1),
        (4, 1, 2),
        (4, 6, 6),
        (5, 1, 2),
        (5, 3, 3);

SELECT products.name, materials.name FROM product_materials
JOIN products ON product_materials.PID = products.PID
JOIN materials on product_materials.MId = materials.MID