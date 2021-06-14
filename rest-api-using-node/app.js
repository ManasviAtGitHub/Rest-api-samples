const express = require("express");
const app = express();
const mongoose = require("mongoose");

const routeProfiles = require("./routes/profiles");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/abc/first",(req, res) =>{
    res.send("Welcome to RESTful Api");
});






app.use("/api/profiles", routeProfiles);


// app.get("/",(req, res) =>{
//     res.send("Welcome to express again");
// });

const uri = "mongodb+srv://<username>:<password>@node-temp-cluster.ripkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true},()=>
    console.log("connected to mongodb")
);

const PORT = 5000;

app.listen(PORT,()=>
    console.log("Listening on 5000")
);