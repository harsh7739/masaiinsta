

const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title : String,
body : String,
device : String,
no_of_comments : Number,
username:String,
userID:String
},{
    versionKey:false
})

const Postmodel = mongoose.model("post",postSchema)

module.exports = {Postmodel}