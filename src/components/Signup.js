import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup({ onSignup }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!id) newErrors.id = true;
        if (!name) newErrors.name = true;
        if (!password) newErrors.password = true;
        if (!confirmPassword) newErrors.confirmPassword = true;
        if (!email) newErrors.email = true;
        if (!mobilePhone) newErrors.mobilePhone = true;

        if (password !== confirmPassword) {
            newErrors.confirmPassword = true;
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const signupSuccess = onSignup(id, password);
        if (signupSuccess) {
            alert('계정이 성공적으로 생성되었습니다.');
            navigate('/login');
        }
    };

    return (
        <div className="signup">
            <h1>🔥 회원가입 🔥</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => { setId(e.target.value); setErrors((prev) => ({ ...prev, id: false })); }}
                    className={errors.id ? 'error' : ''}
                />
                <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: false })); }}
                    className={errors.name ? 'error' : ''}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: false })); }}
                    className={errors.password ? 'error' : ''}
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors((prev) => ({ ...prev, confirmPassword: false })); }}
                    className={errors.confirmPassword ? 'error' : ''}
                />
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: false })); }}
                    className={errors.email ? 'error' : ''}
                />
                <input
                    type="text"
                    placeholder="휴대전화 번호"
                    value={mobilePhone}
                    onChange={(e) => { setMobilePhone(e.target.value); setErrors((prev) => ({ ...prev, mobilePhone: false })); }}
                    className={errors.mobilePhone ? 'error' : ''}
                />
                <button type="submit">계정 생성</button>
            </form>
        </div>
    );
}

export default Signup;
