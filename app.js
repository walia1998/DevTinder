const express = require("express");

const app = express();

const { authAdmin, userAuth } = require("./src/middlewares/auth.js");

//app.use("/admin", authAdmin);
//Request Handler---> This will match all the HTTP method API Call to /Test

app.get("/admin/getAllUser", authAdmin, (req, res) => {
  res.send("All data sent");
});
app.get("/admin/deleteAllData", authAdmin, (req, res) => {
  res.send("Delete all the admin data");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User data sent");
});

app.post("/user/login", (req, res) => {
  res.send("User Logged in successfully");
});

//Port Listener
app.listen(3000, () => {
  console.log("Successfully start the server on PORT 3000......");
});
