const jwt = require("jsonwebtoken");
const { blackList } = require("../blackList");
const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(blackList.includes(token)){
        res.status(400).send({"msg":"Please login"})
    }
    if(token){
        jwt.verify(token, "masai", (err, decoded)=> {
            if(decoded){
                req.body.userID = decoded.userID
                req.body.username = decoded.username
                next()
            }else{
                res.status(400).send({"msg":"You are not authorised"})
            }
          });
    }else{
     res.status(400).send({"error":"please login First"})
    }
}

module.exports = {auth}