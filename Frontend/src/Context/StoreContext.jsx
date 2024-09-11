import { createContext, useEffect, useState } from "react";
import { food_list } from "../../public/assets/frontend_assets/assets";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    // Add item to cart
    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        // Update the cart in the database if the token is available
        if (token) {
            await axios.post(`${process.env.REACT_BACKEND_URl}/api/cart/add`, { itemId }, {
                headers: { token }
            });
        }
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    // Get the total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItem) {
            if (cartItem.hasOwnProperty(itemId) && cartItem[itemId] > 0) {
                const item = food_list.find(p => p._id === itemId);
                if (item && item.price) {
                    totalAmount += item.price * cartItem[itemId];
                }
            }
        }
        return totalAmount;
    };

    // Load cart data from the database
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${process.env.REACT_BACKEND_URl}/api/cart/get`, {itemId}, {
                headers: { token }
            });
            // Set the cart items retrieved from the database
            setCartItem(response.data.cartItem);
        } catch (error) {
            console.error("Error loading cart data", error);
        }
    };

    // Load cart data on initial render if token is available
    useEffect(() => {
        async function loadData() {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken); // Load cart data using token
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItem,
        addToCart,
        removeFromCart,
        setCartItem,
        getTotalCartAmount,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
