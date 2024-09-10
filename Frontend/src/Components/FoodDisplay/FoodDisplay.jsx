import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';
import Cart from '../../Pages/Cart/Cart';
const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext);
  return (
    <div className='food-display'>
        <h2>Top dishes near your location</h2>
        <div className="display-list">
            {food_list.map((item, index) => {
                if(category === "All" || category === item.category){
                    
                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />

                }
                
                
            })}
        </div>
    </div>
  )
}

export default FoodDisplay