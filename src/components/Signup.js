// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup({ onSignup }) { // Accept an onSignup function to handle new user creation
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (username && password) {
            onSignup(username, password); // Pass new user details to App.js or backend
            alert('Account created successfully');
            navigate('/login'); // Redirect to login page after successful signup
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default Signup;
