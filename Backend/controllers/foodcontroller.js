import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        image: image_filename,
        description: req.body.description,
        category: req.body.category
    });

    try {
        await food.save();
        res.status(200).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add food" });
    }
};

const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.status(200).json({ success: true, data: food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to retrieve food list" });
    }
};

const removeFood = async (req, res) => {
    console.log('Request body:', req.body);
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        fs.unlink(`upload/${food.image}`, (err) => {
            if (err) {
                console.error("Failed to delete image file:", err);
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food removed successfully" });

    } catch (error) {
        console.log("Error in removeFood:", error); // Improved error logging
        res.status(500).json({ success: false, message: "Failed to remove food" });
    }
};


export { addFood, listFood, removeFood };
