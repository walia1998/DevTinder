const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://waliaashu1998:wQ_f9AY-KtNg8G3@cluster0.7i8tj.mongodb.net/"
  );
};

module.exports = connectDB;
