import React, { useContext, useState } from 'react';
import { AuthContext } from './contexts/authcontext';
import { Link } from 'react-router-dom'
import myImage from './header_pic.webp';
import NavigationBar from './Header';
const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [display, setDisplay] = useState('')
    const [error, setError] = useState('');

 
    return (
        <div>
            <NavigationBar displayChange={setDisplay}/>
            
         
        </div>
    );
};

export default Home;