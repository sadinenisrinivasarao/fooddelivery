import express from "express";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import UserRouter from "./routes/UserRoute.js";
import CartRouter from "./routes/CartRoute.js";
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
app.use("/api/user", UserRouter);
app.use("/api/cart", CartRouter);
app.get("/", (req, res) => {
    res.send("API working");
});

export default app;
