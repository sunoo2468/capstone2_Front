import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin, users }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!username) newErrors.username = true;
        if (!password) newErrors.password = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const userExists = users.some(user => user.username === username && user.password === password);
        if (userExists) {
            onLogin();
            navigate('/');
        } else {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <div className="login">
            <h1>로그인</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setErrors((prev) => ({ ...prev, username: false })); }}
                    className={errors.username ? 'error' : ''}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: false })); }}
                    className={errors.password ? 'error' : ''}
                />
                <button type="submit">로그인</button>
            </form>
            <p>계정이 없으신가요? <Link to="/signup">회원가입하기</Link></p>
        </div>
    );
}

export default Login;
