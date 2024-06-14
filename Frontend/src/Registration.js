import React, { useContext, useState } from 'react';
import { AuthContext } from './contexts/authcontext';
import myImage from './header_pic.webp';
import { Link } from 'react-router-dom';
import { register } from './api';

export default function RegistrationForm() {
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError(true);
    } else {
      try {
        const response = await register(name, email, password);
        if (response.status === 201) {
          setSubmitted(true);
          setError(false);
        }
      } catch (error) {
        setError(true);
      }
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div style={{ display: submitted ? '' : 'none', width: '100%' }}>
        <h1 style={{width: '100%'}}>User {name} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div style={{ display: error ? '' : 'none' }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', textAlign: 'center' }}>
        {errorMessage()}
        {successMessage()}
      </div>
      <div className='box-container'>
      <div className='top-box'><img src={myImage} alt="Header that says Online Voting System" /></div>
      <div className='bottom-box'>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleName}
            id="username"
            value={name}
            type="text"
          />
        </div>
        <div className='input-container'>
          <label className="label">Email:  </label>
          <input
            onChange={handleEmail}
            id="email"
            value={email}
            type="text"
          />
        </div>
        <div className='input-container'>
          <label className="label">Password:</label>
          <input
            onChange={handlePassword}
            id="password"
            value={password}
            type="password"
          />
        </div>
        <button className="btn" type="submit">Sign Up</button>
        <p className="swap">Already signed up? <Link to="/login"> Click Here</Link></p>
      </form>
      </div>
      </div>
    </div>
  );
}
