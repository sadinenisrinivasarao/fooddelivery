import userModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: "Error logging in" });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Respond with success and token
        res.json({ success: true, token, message: "User created successfully" });
    } catch (error) {
        res.json({ success: false, message: "Error creating user" });
    }
};

export { loginUser, registerUser };
