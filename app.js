const express = require("express");

const connectDB = require("./src/config/database.js");

const app = express();

const User = require("./src/models/user.js");
const validator = require("validator");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body._id;
  try {
    console.log(userEmail);
    const users = await User.findById({ _id: userEmail });
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//Api - Feed API - GET /feed -get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    await User.find({});
    res.send(user);
  } catch (error) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//Delete a user from the database
/**
 * app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //const user = await User.findByIdAndDelete(_id : userId); We can use this also.
    await User.findByIdAndDelete(userId);
    res.send("User Deleted successfully");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});
 * 
 */

//Update a user detail of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "gender",
      "firstName",
      "lastName",
      "age",
      "photoUrl",
      "skills",
      "password",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) => 
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }

    if (data?.skills.length > 12) {
      throw new Error("Skills can't be add more than 12");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, { runValidator: true });
    res.send("User Update Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Used DeleteMany fxm
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.deleteMany({ firstName: /Mayanu/ });
    res.send("User Deleted");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

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
