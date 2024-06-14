import React, { useContext, useState } from 'react';
import { AuthContext } from './contexts/authcontext';
import { Link } from 'react-router-dom'
import myImage from './header_pic.webp';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

 
    return (
        <div>
            <nav></nav>
            <div>
                Sup
            </div>
            <div>
                Was good
            </div>
            <div>
                How you do
            </div>
         
        </div>
    );
};

export default Home;