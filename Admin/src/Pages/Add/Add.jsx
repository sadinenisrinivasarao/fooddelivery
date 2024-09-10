import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../../public/admin_assets/assets'
import axios from "axios"
const Add = () => {
    const [image,setImage] = useState(false);
    const [data, setData] =  useState({
        name: '',
        description: '',
        price: '',
        category:"Salad"
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));

    }
    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category' ,data.category);
        formData.append('image', image);
        
            const response = await axios.post(`${import.meta.env.BASE_URL}/api/food/add`, formData)
                if(response.data.success){
                    alert("Successfully added to database")
                    setData({
                        name: '',
                        description: '',
                        price: '',
                        category:"Salad"
                    })
                    setImage(false)
                }
            
    }
  return (
    <div className='admin-add'>
        <form className='admin-flex-col' onSubmit={onSubmitHandler}>
            <div className='admin-image-upload admin-flex-col'>
                <p>Upload image</p>
                <label htmlFor="image">
                    <img src={ image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0]) } type="file"  id='image' hidden required/>
            </div>
            <div className="admin-add-product-name admin-flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type the item name' id="" />
            </div>
            <div className="admin-add-product-disc admin-flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Enter product content' required/>
            </div>
            <div className="admin-add-category-price">
                <div className="admin-add-category admin-flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" id="">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Veg">Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="admin-add-price admin-flex-col">
                    <p>Product price</p>
<input onChange={onChangeHandler} value={data.price} type="number" name="price" id="" placeholder='Enter price' />
                </div>
            </div>
            <button type='submit' className='admin-add-btn'> Add</button>
        </form>
    </div>
  )
}

export default Add