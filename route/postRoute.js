
const express = require("express")
const { Postmodel } = require("../model/postModel")
const {auth} = require("../middleware/authMiddleware")
const postRouter = express.Router()
postRouter.use(auth)

postRouter.get("/",async(req,res)=>{
    const {device} = req.query
    try {
        if(device){
            const posts = await Postmodel.find({username:req.body.username,device})
        res.status(200).send(posts)
        }
        const posts = await Postmodel.find({username:req.body.username})
        res.status(200).send(posts)
    } catch (error) {
        res.status({"error":error.message})
    }
})

postRouter.post("/add",async(req,res)=>{
    try {
        const post = new Postmodel(req.body)
        await post.save()
        res.status(200).send({"msg":"Post added successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(400).send({"error":error.message})
    }
})


postRouter.patch("/update/postID",async(req,res)=>{
    const {postID} = req.params
    const posts = await Postmodel.find({_id:postID})
try {
    if(req.body.username==posts.username){
        await Postmodel.findByIdAndUpdate({_id:postID},req.body)
        res.status({"msg":"post updated successfully"})
    }else{
        res.status(400).send({"error":"You are not authorised"})
    }
    
} catch (error) {
    res.status(400).send({"error":error})
}
})

postRouter.delete("/delete/postID",async(req,res)=>{
    const {postID} = req.params
    const posts = await Postmodel.find({_id:postID})
try {
    if(req.body.username==posts.username){
        await Postmodel.findByIdAndUpdate({_id:postID})
        res.status({"msg":"post deleted successfully"})
    }else{
        res.status(400).send({"error":"You are not authorised"})
    }
    
} catch (error) {
    res.status(400).send({"error":error})
}
})

postRouter.get("/top",async(req,res)=>{
    try {
        const posts = await Postmodel.find({username:req.body.username}).sort({no_of_comments:-1}).limit(3)
        res.status(200).send(posts)
    } catch (error) {
        res.status({"error":error.message})
    }
})



module.exports = {postRouter}