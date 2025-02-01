require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connectDB = require("./config/ConnectDB.js");
const FaqsSchema = require("./model/Faqs_model.js");
const cors = require("cors");
// const translate = require('@vitalets/google-translate-api');
const translate = require("google-translate-api-x");

//using body parser for getting data from upcoming url
app.use(bodyparser.json());
//connecting the mongodb
connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173", //for development
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true, //Allow cookie if needed
  })
);

//created post req for new FAQ's
app.post("/api/new-faq", async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer)
    return res.status(400).json({ msge: "please provide Q and A" });

  try {
    //convert questions to other languages
    const q_hi = await translate(question, { to: "hi" });
    const q_bn = await translate(question, { to: "bn" });
    const q_ta = await translate(question, { to: "ta" });

    //convert answers to other languages
    const a_hi = await translate(answer, { to: "hi" });
    const a_bn = await translate(answer, { to: "bn" });
    const a_ta = await translate(answer, { to: "ta" });

    //asign the final converted question
    const question_hi = q_hi.text;
    const question_bn = q_bn.text;
    const question_ta = q_ta.text;
    
    //asign the final converted answer
    const answer_hi = a_hi.text;
    const answer_bn = a_bn.text;
    const answer_ta = a_ta.text;


    const SaveFaqs = await FaqsSchema.create({
      question,
      answer,
      question_hi,
      question_bn,
      question_ta,
      answer_hi,
      answer_bn,
      answer_ta,
    });
    return res
      .status(201)
      .json({ msge: "new faq saved success", faq: SaveFaqs });
  } catch (error) {
    return res.status(500).json({ msge: `Error: ${error.message}` });
  }
});


app.get("/api/faqs", async( req , res ) => {
    const lang = req.query.lang
   
    try {
        const result = await FaqsSchema.find(); //getting all the faqs

        //finding questions answers based on lang prefrence
        const translatedText = result.map( ( data ) => ( {
            question: data[ `question_${lang}` ] || data.question, 
            answer: data[ `answer${lang}` ] || data.answer, 
        }) )

        return res.status(200).json({"msge":"fecth success", data: translatedText })
    } catch (error) {
      return res.status(400).json({"msge":"error while fetching the data", error: error.message })        
    }
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
