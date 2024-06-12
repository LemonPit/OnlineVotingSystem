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
    <div className="AppContainer">
    <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/login" element={<LoginForm/>} /> 
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/home" element={isLoggedIn ? <Home/> : <Navigate to="/" />} />
          
        </Routes>

    </Router>
    </div>
    </div>
  );
}

export default App;
