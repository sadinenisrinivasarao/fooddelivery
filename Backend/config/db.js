import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sadinenisrinivasarao6:Sadineni66@cluster0.jn5lk.mongodb.net/srinu-sadineni').then(() => {
        console.log('MongoDB connected');
    })
}