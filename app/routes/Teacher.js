const {hash} = require("../utils/helper");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const TeacherModel = require("../models/Teacher");
const express = require("express");
const Router = express.Router();


Router.post("/register" , async (req , res) => {
    const NewBody = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        city: Joi.string().required(),
        birthdate: Joi.string().required(),
        password: Joi.string().min(8).required()
    });
    const validate = NewBody.validate(req.body);
    if(validate.error){
        return res.status(400).send(validate.error.details);
    }

    const Teacher = new TeacherModel(req.body);
    await Teacher.save();
    res.status(200).send({Teacher});
});

Router.post("/login" , async (req , res) => {
    const {email , password} = req.body;
    if(!(email && password)){
        return res.status(400).send({error: "Please check your email and password"});
    }
    const Teacher = await TeacherModel.findOne({email});
    if(!Teacher){
        return res.status(400).send({error: "Please check your email and password"});
    }
    if(Teacher.password == hash(password , Teacher.secret)){
        const token = jwt.sign({_id: Teacher._id} , {
            expiresIn: 60
        });
        res.status(200).send({token});
    }
})

module.exports = Router;