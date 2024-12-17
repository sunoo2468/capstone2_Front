import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Logout.css';

function Logout({ onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        onLogout(); 
        navigate('/'); 
    };

    const handleCancel = () => {
        const previousPath = location.state?.from || '/'; 
        navigate(previousPath); 
    };

    return (
        <div className="logout">
            <div className="logout-container">
                <h1>로그아웃</h1>
                <p>정말 로그아웃 하시겠습니까?</p>
                <div className="logout-buttons">
                    <button onClick={handleLogout} className="confirm-button">로그아웃</button>
                    <button onClick={handleCancel} className="cancel-button">취소</button>
                </div>
            </div>
        </div>
    );
}

export default Logout;
