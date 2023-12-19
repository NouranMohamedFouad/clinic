import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import './Login.css';
import axios from "axios";


const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleFormSubmit = () => {
        axios.post(`${backendUrl}/SignIN`, formData)
            .then(response => {
                console.log(response.data);
                // Logic for successful login
                setError("Signed In Successfully");
                if (response.status === 200) {
                    window.open(`/Doctor?username=${formData.username}`, '_blank');

                }else if(response.status === 201){
                    window.open(`/Patient?username=${formData.username}`, '_blank');
                }
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 400) {
                        setError('Password or Username is Incorrect.');
                    }
                } else {
                    setError(' error. Please try again.');
                }
            });


    }


    return (
        <div className="container ">
            <div className="header">
                <div className="text">Log In</div>
                <div className="underline"></div>
            </div>
            {error && <div className="error-message header "  style={{ color: 'red' }}>{error}</div>}
            <form>
                <div className="inputs">

                    <div className="input">
                        <label htmlFor="username" className="info">Email</label>
                        <input type="text" placeholder="your email" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })}/>
                    </div>
                    <div className="input">
                        <label htmlFor="password" className="info">Password</label>
                        <input type="text" placeholder="your password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>

                    <div className="submit-container">


                        <button type="button" onClick={handleFormSubmit} className="Login">Login</button>
                        <button><Link to="/Signup" type="submit" className="Signup">Sign UP</Link></button>

                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login