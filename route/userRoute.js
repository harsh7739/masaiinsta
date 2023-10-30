const express = require("express")
const bcrypt = require("bcrypt")
const { UserModel } = require("../model/userModel")
const jwt = require("jsonwebtoken")
const { blackList } = require("../blackList")

const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    // console.log(req.body)
    const {name,email,gender,password,age,city,is_married} = req.body
   try {
    const user = await UserModel.findOne({email})
    if(user){
        res.status(400).send({"msg":"User already exist, please login"})
    }else{
        bcrypt.hash(password, 5, async(err, hash)=> {
         if(err){
            res.status(200).send({"msg":"Password can not hash..."})
         }else{
            const person =new UserModel({name,email,gender,password:hash,age,city,is_married})
            await person.save()
            res.status(200).send({"msg":"Registration Successfull"})
         }
        });
    }
   } catch (error) {
    res.status(400).send({"error":error.message})
   }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    console.log(req.body)
    try {
        const user =await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token = jwt.sign({username:user.name,userID:user._id},"masai",{expiresIn:"7 days"})
                    res.status(200).send({"msg":"Login Successfull","token":token})
                }else{
                    res.status(200).send({"msg":"Wrong Credential"})
                }
            });
        }else{
            res.status(400).send({"msg":"user not found..."})
        }
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

userRouter.get("/logout",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1] || null
    try {
        blackList.push(token)
        res.status(200).send({"msg":"Logut Successfully"})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

module.exports = {userRouter}