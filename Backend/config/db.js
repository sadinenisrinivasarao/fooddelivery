// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://sadinenisrinivasarao6:Sadineni66@cluster0.jn5lk.mongodb.net/srinu-sadineni').then(() => {
//         console.log('MongoDB connected');
//     })
// }



// export const connectDB = async () => {
//     await mongoose.connect(process.env.MONGO_URI)
//         .then(() => {
//             console.log('MongoDB connected');
//         })
//         .catch(err => console.error('Error connecting to MongoDB', err));
// }


import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sadinenisrinivasarao6:Sadineni66', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

// Exporting the connectDB function as default
export default connectDB;

