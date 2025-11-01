const mysql = require('mysql2');

const dbConnect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventory_system"
}).promise()

module.exports = dbConnect;
