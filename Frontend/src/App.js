import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginForm from './Login';
import Background from './background';
import RegistrationForm from './Registration';
import Home from './HomePage';
//import Header from './Header'
import './App.css';

import { AuthContext } from './contexts/authcontext';



function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);

  
  return (
    <div >
    {<Background />}
    
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<div className="AppContainer"><LoginForm/></div>} /> 
          <Route path="/register" element={<div className="AppContainer"><RegistrationForm /></div>} />
          <Route path="/home" element={isLoggedIn ? <Home/> : <Navigate to="/" />} />
          
        </Routes>

    </Router>
    
    </div>
  );
}

export default App;
