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
    <div id="NavBar_Body">
    <div className="navbar">
      <ul className="navbar-list">
        <div><li><img src={myImage} alt="Header that says Online Voting System" id='header-img'/></li></div>
        <div onClick={() => displayChange('start')}><li><p className='text-options'>Start</p></li></div>
        <div onClick={() => displayChange('elections')}><li><p className='text-options'>Elections</p></li></div>
        <div onClick={() => displayChange('settings')}><li><p className='text-options'>Settings</p></li></div>
        <div onClick={() => displayChange('results')}><li><p className='text-options'>Results</p></li></div>
        <div onClick={() => displayChange('ballot')}><li><p className='text-options'>Ballot</p></li></div>        
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