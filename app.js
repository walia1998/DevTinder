const express = require("express");

const app = express();

//Request Handler---> This will match all the HTTP method API Call to /Test
app.get(
  "/user",
  (req, res, next) => {
    console.log("Welcome");
    //res.send("Welcome to test page of DevTinder");
    next();
  },
  (req, res, next) => {
    console.log("HAHHAHAHAH");
    res.send("looogoggo");
    next();
  },
  (req, res) => {
    console.log("ojojoojojoj");
    res.send("uiririri");
  }
);

//This will only handle GET call to /user

// app.get("/user", (req,res) => {
//     res.send({
//         firstName : "Ashish",
//         lastName : "Walia"
//     });
// })

// app.post("/user", (req,res) => {
//     //write code for save data in DB
//   res.send("Successfully saved the data");
// });
// app.delete('/user', (req,res) => {
//     res.send("successfully deleted the data");
// })

//Port Listener
app.listen(3000, () => {
  console.log("Successfully start the server on PORT 3000......");
});
