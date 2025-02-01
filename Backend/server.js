require("dotenv").config();
const express = require('express');
const app =  express()
const bodyparser = require("body-parser");

app.use( bodyparser.json());


const PORT = process.env.PORT || 4000;

app.listen( PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})