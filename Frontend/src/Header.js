import React, { useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import myImage from './header_pic.webp';
import './navbar.css';

function NavigationBar({ displayChange }) {
    const [timezone, setTimezone] = useState('');

    useEffect(() => {
        const getTimezone = () => {
            const offset = new Date().getTimezoneOffset() / -60;
            const timezoneString = offset >= 0 ? `UTC+${offset}` : `UTC${offset}`;
            setTimezone(timezoneString);
        };

        getTimezone(); 

        
        const interval = setInterval(getTimezone, 60000);

        return () => clearInterval(interval); 
    }, []);
  return (
    <div>
    <div className="navbar">
      <ul className="navbar-list">
        <div><li><img src={myImage} alt="Header that says Online Voting System" id='header-img'/></li></div>
        <Link to="/start"><li>Start</li></Link>
        <Link to="/elections" target="_blank"><li><p className='text-options'>Elections</p></li></Link>
        <Link to="/settings" target="_blank"><li><p className='text-options'>Settings</p></li></Link>
        <Link to="/results" target="_blank"><li><p className='text-options'>Results</p></li></Link>
        <Link to="/ballot" target="_blank"><li><p className='text-options'>Ballot</p></li></Link>        
      </ul>
    </div>
    <div className='nav-info'>
        <div className='timezone'>
            <p>Timezone: <br></br>{timezone}</p>
        </div>
    </div>
    </div>
  );
}

export default NavigationBar;