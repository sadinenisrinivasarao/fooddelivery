import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodcontroller.js';
import multer from 'multer';

const foodRouter = express.Router();

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Route for adding food with image upload
foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    // The file is now in req.file.buffer
    req.file ? console.log('File uploaded:', req.file) : console.log('No file uploaded');
    // Call your existing addFood controller function
    addFood(req, res, next);
});

// Route to list all food items
foodRouter.get("/list", listFood);

// Route for removing food items
foodRouter.post("/remove", removeFood);

export default foodRouter;
