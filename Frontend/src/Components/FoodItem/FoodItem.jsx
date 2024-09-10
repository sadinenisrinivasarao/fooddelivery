import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../../public/assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const {cartItem, addToCart, removeFromCart } = useContext(StoreContext);

   
    return (
        <div className="food-item">
            <div className="item-image">
                <img className="item-image" src={image} alt="" />
                <div className='item-count-icons'>
                    {/* {console.log(id)} */}
                    {
                        !cartItem[id]
                            ? <img src={assets.add_icon_white} className='white_add_icon' onClick={() => addToCart(id)} />
                            : <div className='item-counter'>
                                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                                <p className="item-count">{cartItem[id]}</p>
                                <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
                            </div>
                    }
                </div>
            </div>
            <div className="item-info">
                <div className="item-details">
                    <p className='item-name'>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="item-desc">
                    {description}
                </p>
                <p className="item-price">
                    ${price}
                </p>
            </div>
        </div>
    );
}

export default FoodItem;
