const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(require('./src/middleware/rateLimitMiddleware.js'))

app.use("/user", require("./src/controllers/userController.js"));
app.use('/materials', require("./src/controllers/materials.js"))
app.use('/products', require("./src/controllers/products.js"));
app.use("/history", require("./src/controllers/TransactionHistoryController.js"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("port in 5000");
})