import React, { useContext, useState } from 'react';
import { AuthContext } from './contexts/authcontext';

import { login } from './api'; // Ensure this path matches your project structure

const LoginForm = () => {
    const { handleLogin } = useContext(AuthContext);
    const [username, setUsername] = useState('');
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
            setError('An error occured during login.')

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
                setError('Login failed. Please check your username and password.');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;