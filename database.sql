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
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    buying_price INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    availability VARCHAR(25) NOT NULL
);

CREATE TABLE products (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    PID INT(11) UNIQUE,
    name VARCHAR(25) NOT NULL,
    selling_price INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    availability VARCHAR(25) NOT NULL
);

INSERT INTO products (
    name, PID, selling_price, quantity, availability
) VALUES
    ("Chair", 5792, 250, 20, "in-Stock"),
    ("Table", 6523, 100, 35, "in-Stock"),
    ("Organizer", 0923, 150, 0, "out of stock");

INSERT INTO materials (
    name, buying_price, quantity, availability
) VALUES 
    ("Wood Plank", 25, 43, "in-Stock"),
    ("Screws", 5, 55, "in-Stock"),
    ("Wooden Glue", 15, 0, "out of stock");

INSERT INTO sales_overview (
    sales, revenue, profit
) VALUES (0, 0, 0);

INSERT INTO purchase_overview (
    purchase, cost, retrn
) VALUES (0, 0, 0);