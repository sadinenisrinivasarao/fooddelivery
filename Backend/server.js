import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/UserRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/CartRoute.js";

const app = express();
const port = 3000;


app.use(express.json())
app.use(cors({
    origin: ["https://deploy-food-delivery-page.vercal.app"],
    methods: ['POST', 'GET'],
    credentials: true
}))

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.get("/", (req, res) => {
    res.send("API working");
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})

