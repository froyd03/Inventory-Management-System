const express = require('express');
const app = express();
const cors = require('cors');

//const userRoute = require("./src/controllers/userController.js")

app.use(express.json());
app.use(cors());

app.use('/materials', require("./src/controllers/materials.js"))
app.use('/products', require("./src/controllers/products.js"));
//app.use("/api/user", userRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("port in 5000");
})