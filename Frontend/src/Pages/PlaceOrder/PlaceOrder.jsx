import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
const PlaceOrder = () => {

  const {food_list, cartItem, getTotalCartAmount} = useContext(StoreContext);

  var deliveryFee = 0;
  food_list.map((item,index) =>{
    if(cartItem[item._id] === 0) {
      deliveryFee = 0;
    }
    if(cartItem[item._id] >0 ) {
      deliveryFee = 2;
    }
  }) 
  return (
    <div>
      <div className="placeorder">
        <form className='place-order'>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text"  placeholder='First name'/>
            <input type="text"  placeholder='Last name'/>
          </div>
          <input type="text"  placeholder='Email address'/>
            <input type="text"  placeholder='Shipping address'/>
            <div className="multi-fields">
            <input type="text"  placeholder='City'/>
            <input type="text"  placeholder='State'/>
          </div>
          <input type="text" name="" id="" placeholder='Phone number' />
          </div>
          <div className="place-order-right">
          <div className="cart-total">
        <h2>Cart Total</h2>
      <div>
      <div className="cart-total-details">
        <p>Subtotal: </p>
        <p>$ { getTotalCartAmount() }</p>

      </div>
      <hr />
      <div className="cart-total-details">
        <p>Delivery Fee</p>
<p>$ {deliveryFee }</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <b>Total</b>
        <b>$ {getTotalCartAmount() + deliveryFee}</b>

      </div>
      
    </div>
    <button >Proceed to Payment</button>
    </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder