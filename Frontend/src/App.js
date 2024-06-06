import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginForm from './Login';
//import RegistrationForm from './Registration';
//import Header from './Header'
import './App.css';
import { AuthContext } from './contexts/authcontext';



function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);

  
  return (
    <div className="AppContainer">
    {/*<Header />*/}
    <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          {/* 
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/start" element={isLoggedIn ? <Start/> : <Navigate to="/" />} />
          */}
        </Routes>

    </Router>
    </div>
  );
}

export default App;
