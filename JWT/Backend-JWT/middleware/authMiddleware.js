import jwt from 'jsonwebtoken';

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

export default requireAuth;