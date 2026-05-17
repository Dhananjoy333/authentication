import express from 'express';
import cors from "cors";
import jwt from 'jsonwebtoken';
import {Student} from "./models/Students.js";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_DB
app.use(cors({origin : process.env.FRONTEND_URL}));

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('Connection error:', err);
    });

// Middleware for parsing JSON
app.use(express.json());

//login route
app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    res.status(200).send({
        message: 'Login Successful',
        username: username,
        password: password,
    });
})

//signup
app.post('/api/signUp', async (req, res) => {
    const {username, password} = req.body;
    res.status(200).send({
        message: 'Login Successful',
        username: username,
        password: password,
    });
})


// Basic Route
app.get('/', async (req, res) => {
    const students = await Student.find({},{_id: false, name:true})
    res.json(students);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
