import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6,'Password must be at least 6 characters'],
    }
})

//fire a function before doc saved to db
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
})

export const User = mongoose.model('User', UserSchema);