require("dotenv").config();
const express = require('express');
const app =  express()
const bodyparser = require("body-parser");
const connectDB = require('./config/ConnectDB.js');
const FaqsSchema = require('./model/Faqs_model.js');
const cors = require('cors');


//using body parser for getting data from upcoming url
app.use( bodyparser.json());
//connecting the mongodb
connectDB();

app.use( cors( {
    origin: [
        'http://localhost:5173', //for development
    ],
    methods:[ 'GET', 'PUT' , 'POST' , 'DELETE'],
    credentials:true, //Allow cookie if needed
}))



//created post req for new FAQ's
app.post("/api/new-faq", async (req, res) => {
    const { question , answer } = req.body;
    if( !question || !answer ) return res.status(400).json({"msge":"please provide Q and A"})
    
    try {
        const SaveFaqs = await FaqsSchema.create({
            question,
            answer
        })
        return res.status(201).json({"msge":"new faq saved success"})
    } catch (error) {
        return res.status(500).json({"msge":"error while saving faq"});
    }  
})












const PORT = process.env.PORT || 4000;
app.listen( PORT, () => {
    console.log(`server running on PORT ${PORT}`)
})