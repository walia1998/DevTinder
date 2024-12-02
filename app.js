const express = require("express");

const app = express();



//Request Handler
app.use("/home", (req,res) => {
    res.send("Welcome to home page of DevTinder")
})

app.use("/hello", (req,res) => {
    res.send("Welcome to our Hello Page");
})

app.listen(3000, () => {
    console.log("Successfully start the server on PORT 3000......")
})