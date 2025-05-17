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
    brand VARCHAR(50) NOT NULL,
    price INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    measure_type VARCHAR(5) NOT NULL,
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

CREATE TABLE orders(
    OID INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL, 
    order_value INT(11) NOT NULL,
    quantity INT(11) NOT NULL,
    per_quantity INT(11) NOT NULL,
    order_ID VARCHAR(50),
    order_date DATE DEFAULT CURRENT_DATE(),
    status VARCHAR(20) NOT NULL 
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
    name, brand, price, quantity, measure_type, availability
) VALUES 
    ("Wood Plank", "TimberPro", 80, 43, "pcs", "In-stock"),
    ("Screws", "GripTight", 5, 55, "pcs", "In-stock"),
    ("Industrial Glue", "BondId", 12, 0, "g", "Out of stock"),
    ("varnish", "WoodShield", 10, 20, "L", "Low stock"),
    ("Box Nails", "SteelMax", 7, 12, "pcs", "Low stock"),
    ("Cotton Thread", "SteelMax", 7, 12, "kg", "Low stock"),
    ("Upholstery Foam", "ComfortCore", 150, 18, "kg", "Low stock"),
    ("White Paint", "ColorTone", 220, 0, "L", "Out of Stock"),
    ("Zipper (12 inch)", "ZipLine", 15, 400, "pcs", "In-Stock"),
    ("Fabric Roll", "SoftWeave", 300, 30, "m", "In-Stock");

INSERT INTO supplier (
    MID, name, email, contact_number, supplier_type 
) VALUES
    (3, "John Doe", "doejames@gmail.com", "0912345678", "taking returns"),
    (1, "David Gonzales", "richard@gmail.com", "0912345678", "not taking returns"),
    (4, "Ian James", "Martin@gmail.com", "0912345678","taking returns"),
    (2, "Christian Lee", "richard@gmail.com", "0912345678", "taking returns"),
    (5, "John Benedict", "benedictt@gmail.com", "0912345678", "taking returns"),
    (6, "Rose Mary", "roseee@gmail.com", "0912345678", "not taking returns"),
    (7, "Luke Espirito", "lukeespi@yahoo.com", "0912345678", "taking returns"),
    (8, "Jake Angelo", "angee@gmail.com", "0912345678", "taking returns"),
    (9, "Kassandra Mae", "kasie@gmail.com", "0912345678", "not taking returns"),
    (10, "Alejandro Lloyd", "lloydAlehan@yahoo.com", "0912345678", "taking returns");

INSERT INTO orders(
    name, order_value, quantity, per_quantity, order_ID, order_date, status
)VALUES
    ("Screws", 500, 100, 5, "ORD-1001", "2025-5-08", "completed"),
    ("Wood Plank", 3150, 210, 15, "ORD-1002", "2025-5-12", "processing"),
    ("Industrial Glue", 840, 70, 12, "ORD-1101", "2025-5-17", "processing"),
    ("Cotton Thread", 1050, 210, 5, "ORD-1010", "2025-4-30", "completed"),
    ("varnish", 1400, 140, 10, "ORD-1022", "2025-4-20", "completed"),
    ("Wood Plank", 6400, 80, 80, "ORD-1003", "2025-4-10", "processing"),
    ("Screws", 500, 100, 5, "ORD-1004", "2025-6-12", "completed"),
    ("Wood Plank", 3150, 210, 15, "ORD-1005", "2025-6-22", "completed"),
    ("Industrial Glue", 840, 70, 12, "ORD-1006", "2025-6-30", "completed"),
    ("Cotton Thread", 1050, 210, 5, "ORD-1007", "2025-5-16", "completed"),
    ("varnish", 1400, 140, 10, "ORD-1008", "2025-5-20", "completed"),
    ("Wood Plank", 6400, 80, 80, "ORD-1021", "2025-4-19", "completed");

INSERT INTO sales_overview (
    sales, revenue, profit
) VALUES (1532, 7582, 6983);

INSERT INTO purchase_overview (
    purchase, cost, retrn
) VALUES (771, 4910, 0);


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