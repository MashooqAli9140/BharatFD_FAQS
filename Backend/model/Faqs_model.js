const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaqsSchema = new Schema( {
      question: { type: String , required: true },
      answer: { type: String , required: true },
      question_hi: { type: String , required: true },
      question_bn: { type: String , required: true },
      question_ta: { type: String , required: true },
      answer_hi: { type: String , required: true },
      answer_bn: { type: String , required: true },
      answer_ta: { type: String , required: true },
})

module.exports = mongoose.model( 'Faqs_model' ,FaqsSchema);