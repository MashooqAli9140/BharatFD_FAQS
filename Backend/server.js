require("dotenv").config();
const express = require('express');
const app =  express()
const bodyparser = require("body-parser");
const connectDB = require('./config/ConnectDB.js');
const FaqsSchema = require('./model/Faqs_model.js');


//using body parser for getting data from upcoming url
app.use( bodyparser.json());
//connecting the mongodb
connectDB();













const PORT = process.env.PORT || 4000;
app.listen( PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})