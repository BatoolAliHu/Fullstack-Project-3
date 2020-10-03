const mongoose = require("mongoose");
const {hash} = require("./utils/helper");
const shortId = require("shortid");

const TSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    birthdate: {
        type: String
    },
    secret: {
        type: String
    }

});


TSchema.pre("save" , async () => {
    const teacher = this;
    teacher.secret = shortId.generate();
    teacher.password = await hash(teacher.password, teacher.secret);
});

const TeacherModel = new mongoose.model("Teachers" , TSchema);
module.exports = TeacherModel;