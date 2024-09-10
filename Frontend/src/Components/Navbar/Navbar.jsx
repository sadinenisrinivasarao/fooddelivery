import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../../public/assets/frontend_assets/assets'
import { Link, useNavigate   } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {
    const navigate = useNavigate();
    
   
    const [menu, setMenu] = useState("Home");
    const {getTotalCartAmount , token, setToken} = useContext(StoreContext);
    const logOut =() =>{
        navigate('/');

        localStorage.removeItem('token');
        setToken("");
        

    }
    if (document.querySelector('.empty-cart')) {
        setToken("")
    }
    return (
        <div className='Navbar'>
            <div>
               <Link to='/'> <h3 className='my-name'>Srinu Sadineni</h3></Link>
            </div>
            <div>
                <ul className="navbar-menu">
                    <Link to='/home'><li onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</li></Link>
                    <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                </ul>
            </div>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search Icon" />
                <div className="navbar-search-icon">
                <Link to="/cart">
    <img src={assets.basket_icon} alt="Basket Icon" />
</Link>
                    <div className={getTotalCartAmount()?"":"dot"}></div>
                </div>
                {!token?  <button onClick={() => setShowLogin(true)}>Sign in</button>
                : <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className='nav-profile-dropdown'>
                        <li><Link to="/profile" onClick={logOut}>
                        <img src={assets.bag_icon} alt="" /> Orders
                        </Link></li>
                        <hr></hr>
                        <li><Link to="/" onClick={() => setToken("")}>
                        <img src={assets.logout_icon} alt="" /> Logout
                        </Link></li>
                    </ul>
                    </div>}
               
            </div>
        </div>
    )
}

export default Navbar;
