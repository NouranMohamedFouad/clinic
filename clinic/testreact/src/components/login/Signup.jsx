import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Signup.css';
import axios from 'axios';



const Signup = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [formData, setFormData] = useState({ username: '', password: '', usertype: '' }); // Set the default user type to 'patient'
    const [error, setError]=useState('');
    const handleFormSubmit = (event) => {
        event.preventDefault();  // Prevent page reload on form submission
        let dataToSend = {
            username: formData.username,
            password: formData.password,
            usertype: formData.usertype  // Make sure to send the correct userType based on the radio button selection
        };
        axios.post(`${backendUrl}/SignUP`, dataToSend)
            .then(response => {
                console.log(response.data);
                if (error.response.status === 400) {
                    setError('Username is already exists.');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <div className="container "> 
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            {error && <div className="error-message header "  style={{ color: 'red' }}>{error}</div>}
            <form>
                <div className="inputs">

                    <div className="input">
                        <label htmlFor="username" className="info">Email</label>
                        <input type="text" placeholder="your username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
                    </div>
                    <div className="input">
                        <label htmlFor="password" className="info">Password</label>
                        <input type="text" placeholder="your password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    </div>

                    <div className="input">
                        <label htmlFor="usertype" className="info" >User Type</label>

                        <input type="radio" className="radio"
                               id="patient"
                               value="patient"
                               checked={formData.usertype === 'patient'}
                               onChange={() => setFormData({ ...formData, usertype: 'patient' })} />
                        <label htmlFor="radio" className="usertype">Patient</label>

                        <input type="radio"
                               id="doctor"
                               value="doctor"
                               checked={formData.usertype === 'doctor'}
                               onChange={() => setFormData({ ...formData, usertype: 'doctor' })}/>
                        <label htmlFor="radio" className="usertype">Doctor</label>
                    </div>
                </div>

                <div className="submit-container">

                    <div className="submit-container">
                        <button onClick={handleFormSubmit}> <Link to="/Login" type="submit" className="Signup">Sign UP</Link> </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Signup