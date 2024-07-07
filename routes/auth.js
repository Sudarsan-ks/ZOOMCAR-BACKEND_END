const jwt = require("jsonwebtoken");

export const auth = (req, res, next) =>{
    try{
        const token = req.header("Authorization")
        jwt.verify(token, process.env.SECRET_KEY);
        next()
    }
    catch(error){
        res.send({error: error.message})
    }

}