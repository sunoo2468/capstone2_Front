// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <nav className="sidebar">
            <ul>
                <li><Link to="/fireinformation">Fire Information</Link></li>
                <li><Link to="/report">Report</Link></li>
                <li><Link to="/feedback">Feedback</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default Sidebar;
