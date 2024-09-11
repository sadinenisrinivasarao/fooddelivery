import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import UserRouter from "./routes/UserRoute.js";
import CartRouter from "./routes/CartRoute.js";
import 'dotenv/config';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [/https:\/\/fooddelivery-.*\.vercel\.app$/, "https://food-delivery-api-tau.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Connect to the database
connectDB();

// Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", UserRouter);
app.use("/api/cart", CartRouter);

// Basic API route
app.get("/", (req, res) => {
    res.send("API working");
});

// Export the Express app for Vercel
export default app;
