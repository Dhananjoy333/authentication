import mongoose from 'mongoose'
const studentSchema = new mongoose.Schema({}, { strict: false });
export const Student = mongoose.model("students", studentSchema);