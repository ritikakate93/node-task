const express = require('express');
const app = express();
require('dotenv').config();

dbConnect = require('./dbFile');
dbConnect();

app.use(express.json());

app.listen(process.env.PORT,() =>{
    console.log(`server is running on Port ${process.env.PORT}`)
});

