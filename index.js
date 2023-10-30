const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./route/userRoute")
const { postRouter } = require("./route/postRoute")
require("dotenv").config()
const app = express()
app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",postRouter)


const PORT = process.env.port
app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Server is running...")
    } catch (error) {
        console.log(error)
    }
})
module.exports = app