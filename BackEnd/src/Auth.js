const jwt = require('jsonwebtoken');
require('dotenv').config()
exports.Auth = async (req,res,next) => {

    const result = {
        Status : null,
        Message : null,
        Result : null,   
    }

    try {
            
        // console.log("🚀 ~ file: Auth.js ~ line 19 ~ exports.Auth= ~ header('Token')", req.header('Token'))
        var decoded = jwt.verify(req.header('x-auth-token'), process.env.TOKENKEY);
        console.log("Decoded",process.env.TOKENKEY)

        if (!decoded) {
            result.Message = "Token Expired"
            result.Status = 0
            result.Result= null     
            
            return res.status(400).json(result)
        } else {
            next()
        }

        
    } catch (error) {
        result.Message = error.message
        result.Status = 0
        result.Result= null
        console.log("Decoded",error)
        return res.status(400).json(result)
    }
}