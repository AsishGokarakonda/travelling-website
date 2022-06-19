var jwt = require('jsonwebtoken');
secretKey = "nodemon@JWT"


const fetchuser = (req,res,next) =>{
    var token = req.headers.authorization;
    console.log(token)
    if(!token){
        res.status(401).send("Token is not sent")
    }
    try{
        let decodeddata=jwt.verify(token, secretKey);
        req.user=decodeddata.user
        // console.log(decodeddata)
        next()
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }

}

module.exports = fetchuser