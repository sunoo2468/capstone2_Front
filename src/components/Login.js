import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState(''); // 사용자 이름 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // 폼 기본 동작 방지

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: username,
                    user_password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // 로그인 성공 시 홈 화면으로 이동///////*수정
                alert('Login successful!');
                navigate('/');
            } else {
                // 로그인 실패 메시지 출력
                setErrorMessage(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
    );
}

export default Login;
