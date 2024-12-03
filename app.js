const express = require("express");

const connectDB = require("./src/config/database.js");

const app = express();


connectDB()
  .then(() => {
    console.log("Database connection established");
    //Port Listener
    app.listen(3000, () => {
      console.log("Successfully start the server on PORT 3000......");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected", err.message);
  });


