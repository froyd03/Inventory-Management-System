const mysql = require('mysql2');

//if using docker: host.docker.internal

const dbConnect = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Froydbanatao-03",
    database: "inventory_system",
    dateStrings: true
}).promise()

module.exports = dbConnect;
