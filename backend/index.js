const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./src/routes/routes.js');
const { getAllMaterials } = require('./src/services/materialService.js')

app.use(express.json());
app.use(cors());

app.use('/', router);


app.listen(5000, () => {
    console.log("port in 5000");
})