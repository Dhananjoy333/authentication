import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose'
import cors from "cors";
import { User } from './models/User.js';
import bcrypt from 'bcryptjs';
import MongoDBStoreFactory from 'connect-mongodb-session';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const MongoDBSession = MongoDBStoreFactory(session)
const mongoURI = process.env.MongoDB
app.use(cors({origin : process.env.FRONTEND_URL, credentials: true}));

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('Connection error:', err);
  });

const store = new MongoDBSession({
    uri: mongoURI,
    collection: "mySessions"
})

//Session
app.use(session({
    secret: "key",
    resave: false,
    saveUninitialized: false,
    store: store
}))

// Middleware for bodyparser to be able to get hold of frontend json res
app.use(express.json());

//handle signup/Register
app.post('/api/signUp',async (req,res)=>{
    const {username,email,password} = req.body;
    let user = await User.findOne({email})
    if(user){
        return res.status(400).json({message:"Email already exists"})
    }
    const hashedPsw = await bcrypt.hash(password, 12)
    user = new User({
        username,
        email,
        password: hashedPsw,
    })
    await user.save()
    res.status(201).json({message:"Signed up successfully"})
})

const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        return res.status(401).json({message:"Not authorized"})
    }
}

//handle login
app.post('/api/login',async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"User not found. Please sign up."})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(401).json({message:"Wrong Password. Please try again."})
    }
    req.session.isAuth = true
    res.status(200).json({message:"Login successfully"})
})

//protected route
app.get('/api/secret', isAuth, (req, res) => {
    res.json({
        secret: "This is protected data"
    });
});

//handle logout
app.get('/api/logout', (req, res) => {
    req.session.destroy((err)=>{
        if(err) throw err;
        res.clearCookie('connect.sid')
        res.status(200).json({message:"Logout successfully"})
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
