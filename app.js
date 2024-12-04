const express = require("express");

const connectDB = require("./src/config/database.js");

const app = express();

const User = require("./src/models/user.js");


app.use(express.json());

app.post("/signup" , async (req,res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send("Error saving the user:" + err.message)
  }
})

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


