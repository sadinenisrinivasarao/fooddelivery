import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // Adjust the import for default export
import foodRouter from "./routes/foodRoute.js";
import UserRouter from "./routes/UserRoute.js";
import CartRouter from "./routes/CartRoute.js";
import 'dotenv/config';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["https://deploy-food-delivery-page.vercel.app"],
    methods: ['POST', 'GET'],
    credentials: true
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
