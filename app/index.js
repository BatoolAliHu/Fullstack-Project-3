
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect("mongodb://localhost/Batool" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.once("open" , () => {
    console.log("I love Batool 2.")
})


app.listen("3000" , () => {
    console.log("I love Batool.");
});



