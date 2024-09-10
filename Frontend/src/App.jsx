import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import StoreContextProvider from './Context/StoreContext'
import Login from './Components/Login/Login'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  
  return (
    <div className='app'>
      <BrowserRouter>
        <StoreContextProvider>
          {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
          <Navbar setShowLogin={setShowLogin} />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
          </Routes>
        </StoreContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
