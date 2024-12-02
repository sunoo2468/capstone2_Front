import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoutClick = () => {
        navigate('/logout', { state: { from: location.pathname } }); // 현재 경로를 state로 전달
    };

    return (
        <nav className="sidebar">
            <ul>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/">Dashboard</Link>
                </li>
                <li className={location.pathname === "/fireinformation" ? "active" : ""}>
                    <Link to="/fireinformation">Fire Information</Link>
                </li>
                <li className={location.pathname === "/report" ? "active" : ""}>
                    <Link to="/report">Report</Link>
                </li>
                <li className={location.pathname === "/feedback" ? "active" : ""}>
                    <Link to="/feedback">Feedback</Link>
                </li>
                <li className={location.pathname === "/logout" ? "active" : ""}>
                        <button onClick={handleLogoutClick} className="logout-button">
                            Logout
                        </button>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
