import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';

const List = () => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/food/list');
            if (response.data.success) {
                setList(response.data.data);
                // console.log(response.data.data);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const removeFood = async (foodId) => {
        try {
            const response = await axios.post('http://localhost:3000/api/food/remove', { id: foodId });

            if (response.data.success) {
                console.log(response.data)
                await fetchList();
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error("Error removing food item:", error.response ? error.response.data : error.message);
        }
    };
    

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list-container">
            <h1>Food List</h1>
            <div className="list-table-header">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Description</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {list.length > 0 ? (
                <div className="list-table">
                    {list.map((item) => (
                        <div key={item._id} className="list-item">
                            <img src={`http://localhost:3000/images/${item.image}`} alt={item.name} className="list-item-image" />
                            <p className="list-item-name">{item.name}</p>
                            <p className="list-item-category">{item.category}</p>
                            <p className="list-item-description">{item.description}</p>
                            <p className="list-item-price">${item.price}</p>
                            <p onClick={() => removeFood(item._id)} className="list-item-action">X</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No items available</p>
            )}
        </div>
    );
};

export default List;
