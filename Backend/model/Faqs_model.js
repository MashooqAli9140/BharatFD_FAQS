const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaqsSchema = new Schema( {
      question: { type: String , required: true },
      answer: { type: String , required: true },
      question_hi: { type: String },
      question_bn: { type: String },
      question_ta: { type: String },
      answer_hi: { type: String },
      answer_bn: { type: String },
      answer_ta: { type: String },
},
{collection :"BharatFD_FAQS"}
)

module.exports = mongoose.model( 'Faqs_model' ,FaqsSchema);