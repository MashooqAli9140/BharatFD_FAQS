const mongoose = require("mongoose");

const connectDB = async () => {
      try {
        await mongoose.connect(process.env.DATABASE_URI, {

        })
        console.log('mongo db connected')
      } catch (error) {
        console.log("db connection failed");
      }
}
module.exports = connectDB;