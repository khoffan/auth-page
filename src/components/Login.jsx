import React, { useEffect, useState } from 'react'
import axios from 'axios'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const config = {
        method: 'POST',
        url:'http://localhost:3000/login',
        data: {
            email,
            password,
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Make a POST request to your backend API to handle login
        alert('sumbit')

        axios(config)
        .then((result) => {console.log(result);})
        .catch((error) => {console.log(error);})
        // try {
        //     const response = await fetch('http://localhost:3000/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email, password }),
        //     });

        //     // Handle the response from the server
        //     if (response.ok) {
        //         const data = await response.json();
        //         console.log(data); // Do something with the response data
        //     } else {
        //         // Handle error case
        //         console.log('Login failed');
        //     }
        // } catch (error) {
        //     console.log('Error:', error);
        // }
    };
    return (
        <div>
            <div className='login' onSubmit={(e) => handleLogin(e)}>
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
                <button type='submit' onClick={(e) => handleLogin(e)}>Login</button>
            </div>

        </div>
    )
}

export default Login