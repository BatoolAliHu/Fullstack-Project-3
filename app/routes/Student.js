const {hash} = require("./utils/helper");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const StudentModel = require("./models/Student");
const express = require("express");
const Router = express.Router();


Router.get("/" , async (req , res) => {
    await StudentModel.find((err , Students) => {
        if(err){
            return res.status(401).send({error: err});
        }
        return res.status(200).send({Students});
    });
});

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

    const Student = new StudentModel(req.body);
    await Student.save();
    res.status(200).send({Student});
});

Router.post("/login" , async (req , res) => {
    const {email , password} = req.body;
    if(!(email && password)){
        return res.status(400).send({error: "Please check your email and password"});
    }
    const Student = await StudentModel.findOne({email});
    if(!Student){
        return res.status(400).send({error: "Please check your email and password"});
    }
    if(Student.password == hash(password , Student.secret)){
        const token = jwt.sign({_id: Student._id} , {
            expiresIn: 60
        });
        res.status(200).send({token});
    }
});


Router.put("/:id" , async (req , res) => {
    const {id} = req.params;
    const Student = await StudentModel.findOne({_id: id});
    if(!Student){}
})


module.exports = Router;