const express = require("express");

const app = express();

//This will only handle GET call to /user

app.get("/user", (req,res) => {
    res.send({
        firstName : "Ashish",
        lastName : "Walia"
    });
})

app.post("/user", (req,res) => {
    //write code for save data in DB
  res.send("Successfully saved the data");
});
app.delete('/user', (req,res) => {
    res.send("successfully deleted the data");
})


//Request Handler---> This will match all the HTTP method API Call to /Test
app.use("/test", (req,res) => {
    res.send("Welcome to test page of DevTinder")
})


//Port Listener
app.listen(3000, () => {
    console.log("Successfully start the server on PORT 3000......")
})