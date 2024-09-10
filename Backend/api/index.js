import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/CartRoute.js";
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["https://deploy-food-delivery-page.vercel.app"],
    methods: ['POST', 'GET'],
    credentials: true
}));

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.get("/", (req, res) => {
    res.send("API working");
});


export default app;
