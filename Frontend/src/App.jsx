import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StoreContextProvider from './Context/StoreContext';

const Navbar = lazy(() => import('./Components/Navbar/Navbar'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const PlaceOrder = lazy(() => import('./Pages/PlaceOrder/PlaceOrder'));
const Login = lazy(() => import('./Components/Login/Login'));

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className='app'>
      <BrowserRouter>
        <Suspense fallback={<h2>Loading...</h2>}>
          <StoreContextProvider>
            {showLogin && <Login setShowLogin={setShowLogin} />}
            <Navbar setShowLogin={setShowLogin} />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
            </Routes>
          </StoreContextProvider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
