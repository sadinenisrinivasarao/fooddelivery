import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItem, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    let deliveryFee = 0;

    const isCartEmpty = !food_list.some(item => cartItem[item._id] > 0);

    return (
        <div className="cart">
            <div className="cart-items">
                {isCartEmpty ? (
                    <h2 className='empty-cart'>Your cart is empty, please add something to your cart</h2>
                ) : (
                    <>
                        <div className="cart-item-title">
                            <p>Items</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Remove</p>
                        </div>
                        <br />
                        <hr />
                        {food_list.map((item, index) => {
                            if (cartItem[item._id] > 0) {
                                deliveryFee = 2;
                                return (
                                    <div key={item._id}>
                                        <div className="cart-item-title cart-item-item">
                                            <img src={item.image} alt={item.name} />
                                            <p>{item.name}</p>
                                            <p>$ {item.price}</p>
                                            <p>{cartItem[item._id]}</p>
                                            <p>$ {item.price * cartItem[item._id]}</p>
                                            <p onClick={() => removeFromCart(item._id)} className='remove-btn'>X</p>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                        <div className="cart-bottom">
                            <div className="cart-total">
                                <h2>Cart Total</h2>
                                <div className="cart-total-details">
                                    <p>Subtotal: </p>
                                    <p>$ {getTotalCartAmount()}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>$ {deliveryFee}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <b>Total</b>
                                    <b>$ {getTotalCartAmount() + deliveryFee}</b>
                                </div>
                                <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
