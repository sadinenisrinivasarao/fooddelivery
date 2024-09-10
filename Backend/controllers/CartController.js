import userModel from "../models/UserModel.js";

// Add to Cart
const addToCart = async (req, res) => {
    try {
        // Find the user by their ID
        let userData = await userModel.findById(req.body.userId);

        // If the user doesn't exist, send an error response
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the cart data
        let cartData = userData.cartData || {};

        // Increment the item count in the cart or add the item if not present
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cart in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Return success response
        return res.status(200).json({ success: true, cartData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        // Find the user by their ID
        let userData = await userModel.findById(req.body.userId);

        // If the user doesn't exist, send an error response
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the cart data
        let cartData = userData.cartData || {};

        // Check if the item exists in the cart and if its quantity is greater than 0
        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // If the quantity is 0, you might want to remove the item from the cart
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            // Update the user's cart in the database
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        }

        // Return success response
        return res.status(200).json({ success: true, cartData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get Cart Data
const getCart = async (req, res) => {
    try {
        // Find the user by their ID
        let userData = await userModel.findById(req.body.userId);

        // If the user doesn't exist, send an error response
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Get the cart data
        let cartData = userData.cartData || {};

        // Return the cart data
        return res.status(200).json({ success: true, cartData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export { addToCart, removeFromCart, getCart };
