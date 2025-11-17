const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next){
    const token = req.header("x-auth-token");

    try{
        if(!token) return res.status(401).json({message: "Access denied! user not login"});
        const user = jwt.verify(token, process.env.JWTSECRET);
        req.user = user;
        next();
    }catch(error){

        if (error.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(401).json({ message: "Token verification failed" });
        }

    }
}
 
