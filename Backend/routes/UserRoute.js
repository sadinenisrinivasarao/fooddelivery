import express from "express";
import { loginUser, registerUser } from "../controllers/UserController.js";

const UserRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default UserRouter;