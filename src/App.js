// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import FireInformation from './components/FireInformation';
import Report from './components/Report';
import Feedback from './components/Feedback';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([{ username: 'admin', password: 'password' }]);

    const handleLogin = () => setIsLoggedIn(true);

    const handleSignup = (username, password) => {
        setUsers([...users, { username, password }]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} users={users} />} />
                <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                <Route path="/fireinformation" element={isLoggedIn ? <FireInformation /> : <Navigate to="/login" />} />
                <Route path="/report" element={isLoggedIn ? <Report /> : <Navigate to="/login" />} />
                <Route path="/feedback" element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
