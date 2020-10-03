
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
    console.log("MongoDB Connected");
})

const Student = require("./routes/Student");
const Teacher = require("./routes/Teacher")
app.use("/student" , Student);
app.use("/teacher" , Teacher);

app.listen("3000" , () => {
    console.log("Application listening on port 3000");
});



