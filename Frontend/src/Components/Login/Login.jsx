import React, { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../../public/assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const Login = ({ setShowLogin }) => {

    const { token, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState('Sign Up');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const endpoint = currentState === 'Login'
                ? `${import.meta.env.BASE_URL}/api/user/login`
                : `${import.meta.env.BASE_URL}/api/user/register`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Read the error text
                throw new Error(`Network error: ${errorText}`);
            }

            const result = await response.json();

            if (result.success) {
                
                if (currentState === 'Login') {
                    setShowLogin(false);
                    setToken(result.token); // Set the token here
                    localStorage.setItem("token",result.token)
                } else {
                    setCurrentState('Login');
                    setData({
                        email: "",
                        password: ""
                    });
                }
            } else {
                throw new Error(result.message || "Operation failed");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            alert(`Error: ${error.message}`); // Display error message in a popup
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-container'>
                <div className="login-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
                </div>
                <div className="login-inputs">
                    {currentState === "Login" ? null :
                        <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Enter your full name' required />
                    }
                    <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Enter your email' required />
                    <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder='Enter your password' required />
                    <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                </div>

                {currentState === "Login" ? null : (
                    <div className="login-popuo-condition">
                        <input type="checkbox" id="checkbox" required />
                        <p>By continuing, I agree to the terms</p>
                    </div>
                )}

                {currentState === "Login"
                    ? <p>Create a new account? <span className="login-signup" onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span className="login-signup" onClick={() => setCurrentState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default Login;
