const jwt = require("jsonwebtoken")
require('dotenv').config();


const jwtAuthMiddleware = (req, res, next) =>{
    // first check request header has authorize or not 
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'token not found '})


    // extract the jwt token from the request headers
    const token  = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({error: 'Unauthorized'})

        try {

            // verify the jwt token 
            const decoded = jwt.verify(token , process.env.JWT_SECRET)

            // attache the user information to the requested object
            req.user = decoded
            next();
        } catch (error) {
            console.error(error)
            res.status(401).json({error: 'Invalid token'})
        }

}

const generateToken = (userData) =>{
    return jwt.sign(userData, process.env.JWT_SECRET , {expiresIn: 30000})
}

module.exports = {
    jwtAuthMiddleware,
    generateToken
}