require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connectDB = require("./config/ConnectDB.js");
const FaqsSchema = require("./model/Faqs_model.js");
const cors = require("cors");
const translate = require("google-translate-api-x");
const helmet = require('helmet');
const path = require("path");

//using body parser for getting data from upcoming url
app.use(bodyparser.json());
//connecting the mongodb
connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local Development
      "https://bharatfd-faqs-by-mashooq-ali.onrender.com/", // Deployed Frontend
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true, 
  })
);

// Serve static files from the `dist` directory
app.use(express.static(path.join(__dirname, "dist" )));


//helmet use for cdnjs fonts and icon from font awesome
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Restricts default sources
      fontSrc: [
        "'self'",
        "https://fonts.googleapis.com", // For Google Fonts
        "https://fonts.gstatic.com", // For Google Fonts
        "https://cdnjs.cloudflare.com", // For Font Awesome fonts
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Needed for inline styles in some cases
        "https://fonts.googleapis.com", // For Google Fonts styles
        "https://cdnjs.cloudflare.com", // For Font Awesome CSS
      ],
    },
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

//created get req for all FAQ's
app.get("/api/faqs", async( req , res ) => {
    const lang = req.query.lang
   
    try {
        const result = await FaqsSchema.find(); //getting all the faqs

        //finding questions answers based on lang prefrence
        const translatedText = result.map( ( data ) => ( {
             id: data._id,
            question: data[ `question_${lang}` ] || data.question, 
            answer: data[ `answer_${lang}` ] || data.answer, 
        }) )

        return res.status(200).json({"msge":"fecth success", data: translatedText })
    } catch (error) {
      return res.status(400).json({"msge":"error while fetching the data", error: error.message })        
    }
})

//created put req for updating single FAQ's
app.put("/api/edit-faq", async( req , res ) => {
    const { id_selected , ques_for_edit , ans_for_edit } = req.body;
    if( !id_selected || !ques_for_edit || !ans_for_edit ) return res.status(400).json({"msge":"please provide details"});
    
    //now find question by id
    const FindQuestion = await FaqsSchema.findById(id_selected);
    if( !FindQuestion ) return res.status(404).json({"msge":"question not found"});

    //if question is found then do translation and save it to DB
    try {
       //convert questions to other languages
       const q_hi = await translate(ques_for_edit, { to: "hi" });
       const q_bn = await translate(ques_for_edit, { to: "bn" });
       const q_ta = await translate(ques_for_edit, { to: "ta" });

           //convert answers to other languages
       const a_hi = await translate(ans_for_edit, { to: "hi" });
       const a_bn = await translate(ans_for_edit, { to: "bn" });
       const a_ta = await translate(ans_for_edit, { to: "ta" });

           //asign the final converted question
           FindQuestion.question = ques_for_edit
           FindQuestion.question_hi = q_hi.text;
           FindQuestion.question_bn = q_bn.text;
           FindQuestion.question_ta = q_ta.text;

           //asign the final converted answer
           FindQuestion.answer    = ans_for_edit;
           FindQuestion.answer_hi = a_hi.text;
           FindQuestion.answer_bn = a_bn.text;
           FindQuestion.answer_ta = a_ta.text;

        await FindQuestion.save()
        return res.status(201).json({"msge":"Edit success success", data: FindQuestion })
    } catch (error) {
      return res.status(400).json({"msge":"error while updating the data", error: error.message })        
    }
})


// sending index.html file for all routes
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
