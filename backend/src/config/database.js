const mysql = require('mysql2');

//if using docker: host.docker.internal

const dbConnect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventory_system"
}).promise()

module.exports = dbConnect;
