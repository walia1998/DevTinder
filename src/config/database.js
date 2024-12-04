const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pehlichoice2003:dC7f23LeADCmkBcN@cluster0.gjih9.mongodb.net/"
  );
};

module.exports = connectDB;





