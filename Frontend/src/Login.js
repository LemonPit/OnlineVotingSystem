import React, { useContext, useState } from 'react';
import { AuthContext } from './contexts/authcontext';
import { Link } from 'react-router-dom'
import myImage from './header_pic.webp';
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
                try {

                    const response = await login(username, password);
                    if (response.data) {
                        console.log(response)
                    }
                    else {
                        setError('Login failed. Please check your username and password.');
                    }
                } catch (err) {
                    setError('An error occurred during login. Please try again later.');
                }
            }
            else {
                setError('Username and Password error. Please check your information.')
            }
        }
        catch (err) {
            setError('An error occured during login.')

        }
        
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>{error && <h1>{error}</h1>}</div>
            
            <div className='box-container'>
            <div className='top-box'><img src={myImage} alt="Header that says Online Voting System"/></div>
            <div className='bottom-box'>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                <button type="submit">Login</button>
                <p>No Account? <Link to="/register">Click Here to Register</Link></p>
                </div>
                
            </form>
            </div>
            </div>
        </div>
    );
};

export default LoginForm;