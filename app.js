const express = require("express");

const connectDB = require("./src/config/database.js");

const app = express();

const User = require("./src/models/user.js");
const { validationSignupData } = require("./src/utils/validations.js");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //Validation of Data
    validationSignupData(req);

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a new Instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
      age,
    });
    await user.save();
    res.send("User Added Successfully");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$34");
      res.cookie("token", token);
      res.send("Login successfully");
    } else {
      throw new Error("either emailId or password is incorrect ");
    }
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token");
    }

    const decodedMessage = await jwt.verify(token, "Dev@Tinder$34");

    const { _id } = decodedMessage;

    const user = await User.findById(_id );
    if (!user) {
      throw new Error("invalid user");
    }
    res.send(user);
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
    const users = await User.find({});
    res.send(users);
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
