import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

// Controller for adding a new food item
const addFood = async (req, res) => {
    try {
        // Convert the image buffer to a base64 string
        const imageBase64 = req.file.buffer.toString('base64');
        
        // Create a new food item with the base64 encoded image
        const food = new foodModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            image: imageBase64, // Store the image as a base64 string
        });

        // Save the food item to the database
        await food.save();
        
        res.status(200).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add food" });
    }
};

// Controller to list all food items
const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.status(200).json({ success: true, data: food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to retrieve food list" });
    }
};

// Controller to remove a food item
const removeFood = async (req, res) => {
    console.log('Request body:', req.body);
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Remove image from filesystem
        const imagePath = path.join('uploads', food.image);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Failed to delete image file:", err);
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food removed successfully" });

    } catch (error) {
        console.log("Error in removeFood:", error);
        res.status(500).json({ success: false, message: "Failed to remove food" });
    }
};

export { addFood, listFood, removeFood };
