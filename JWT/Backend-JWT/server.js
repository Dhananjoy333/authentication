import express from 'express';
import cors from "cors";
import jwt from 'jsonwebtoken';
import { User } from './models/Users.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_DB
app.use(cors({origin : process.env.FRONTEND_URL, credentials: true}));

//db connection
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('Connection error:', err);
    });

// Middleware
app.use(express.json());
app.use(cookieParser());


//handle Errors
const handleError = (err) => {
    console.log(err.message,err.code);
    let errors = {username: '',email: '', password: ''};
    //handle duplicate error code
    if(err.code === 11000){
        errors.email = 'Email already exists';
        return errors
    }
    //validate error
    if(err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        });
    }
    return errors
}

//create token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) =>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn: maxAge
    })
}

//signup
app.post('/api/signUp', async (req, res) => {
    const {username, email, password} = req.body;
    try{
        let user = new User({
            username,
            email,
            password: password,
        })
        await user.save()
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true , maxAge: maxAge * 1000});
        res.status(201).json({message:'Sign Up successful'})
    }catch (e) {
        const errors = handleError(e)
        res.status(400).json({errors})
    }
})

//login route
app.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    try{

    }catch (e) {

    }
})

// Basic Route
app.get('/', async (req, res) => {
    // const students = await Student.find({},{_id: false, name:true})
    // res.json(students);
    res.send("welcome")
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
