// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://sadinenisrinivasarao6:Sadineni66@cluster0.jn5lk.mongodb.net/srinu-sadineni').then(() => {
//         console.log('MongoDB connected');
//     })
// }

import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch(err => console.error('Error connecting to MongoDB', err));
}
