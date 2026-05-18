import jwt from 'jsonwebtoken';
import {User} from "../models/Users.js";

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    //check json web token exist & is verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.status(401).json({error:"Invalid token"})
            }else {
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.status(401).json({error: 'No token provided'});
    }
}

// check current user
export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            }else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}

export default requireAuth;