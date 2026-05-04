import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose'
import MongoDBStoreFactory from 'connect-mongodb-session';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const MongoDBSession = MongoDBStoreFactory(session)
const mongoURI = process.env.MongoDB

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

// Middleware for JSON
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    req.session.isAuth = true
    res.send('<h1>Hello from ES6 Express Server!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
