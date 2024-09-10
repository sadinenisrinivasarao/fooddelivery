import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/CartController.js'
import authMiddleWare from '../middleware/auth.js';


const CartRouter = express.Router();
cartRouter.post("/add", authMiddleWare, addToCart);
cartRouter.post("/remove", authMiddleWare, removeFromCart);
cartRouter.get("/get", authMiddleWare, getCart);

export default CartRouter;