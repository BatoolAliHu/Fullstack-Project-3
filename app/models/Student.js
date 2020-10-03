const mongoose = require("mongoose");
const {hash} = require("../utils/helper");
const shortId = require("shortid");

const StSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    city: {
        type: String,

    },
    birthdate: {
        type: String
    },
    secret: {
        type: String
    },
    password: {
        type: String
    },
});

StSchema.pre("save" , async () => {
    const student = this;
    student.secret = shortId.generate();
    student.password = await hash(student.password, student.secret);
});

const StudentModel = new mongoose.model("Students" , StSchema);

module.exports = StudentModel;