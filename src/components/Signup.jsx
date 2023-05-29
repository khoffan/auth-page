import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Make a POST request to your backend API to handle registration
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle the response from the server
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Do something with the response data
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  // Make a POST request to your backend API to handle registration
  
  return (
    <div>
    <div className='signup' onSubmit={(e) => handleSignup(e)}>
      <input
        type='text'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      <button type='submit' onClick={(e) => handleSignup(e)}>Register</button>
    </div>
  </div>
)
}


export default Signup