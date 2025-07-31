require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");

dbConnect = require('./dbFile');
dbConnect();

const adminRoutes = require("./Routes/adminRoute");
const sellerRoutes = require("./Routes/sellerRoute")
const errorHandler = require("./Middlewares/errorHandler");

app.use(express.json());
app.use("/Upload", express.static(path.join(__dirname, "Upload")));

app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRoutes);

// Error handler
app.use(errorHandler);

app.listen(process.env.PORT,() =>{
    console.log(`server is running on Port ${process.env.PORT}`)
});

