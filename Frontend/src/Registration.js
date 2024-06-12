import React, { useContext, useState } from 'react';
import { AuthContext } from './contexts/authcontext';
import { Link } from 'react-router-dom'
import myImage from './header_pic.webp';
import { login } from './api'; // Ensure this path matches your project structure

const RegistrationForm = () => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (username && password) {
                console.log("Logging in....")
            }
            else {
                setError('Username error. Please check your username.')
            }
        }
        catch (err) {
            setError('An error occured during registration.')

        }
        try {

            //const response = await login(username, password);
            //if (response.data && response.data.userID) {
                //handleLogin(response.data.userID);
            //}
            //PLACEHOLDER FOR WHEN BACKEND LOGIN IS FUNCTIONAL
            
            const response = true;
            if (response) {
                console.Log("User exists, redirecting to start page")

            } 
            else {
                setError('Registration failed. Please check your username and password.');
            }
        } catch (err) {
            setError('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <div>

            <div className='header'><img src={myImage} alt="Header that says Online Voting System" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
            <form onSubmit={handleSubmit} className='login-container'>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">NJIT Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                <button type="submit">Register</button>
                <p>Already have an Account? <Link to="/login">Back To Login</Link></p>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default RegistrationForm;