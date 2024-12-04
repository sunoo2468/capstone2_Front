import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Logout.css';

function Logout({ onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        onLogout(); // 로그인 상태 초기화
        navigate('/'); // Dashboard로 이동
    };

    const handleCancel = () => {
        const previousPath = location.state?.from || '/'; // 이전 경로 또는 기본 경로 설정
        navigate(previousPath); // 이전 페이지로 이동
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
