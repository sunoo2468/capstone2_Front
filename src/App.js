// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import FireInformation from './components/FireInformation';
// import Report from './components/Report';
// import Feedback from './components/Feedback';

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [users, setUsers] = useState([{ username: 'admin', password: 'password' }]);

//     const handleLogin = (username, password) => {
//         if (!users || !Array.isArray(users)) {
//             console.error('사용자 데이터가 올바르지 않습니다.');
//             return false;
//         }

//         const userExists = users.some(
//             user => user.username === username.trim() && user.password === password.trim()
//         );

//         if (userExists) {
//             setIsLoggedIn(true);
//             return true;
//         }

//         return false;
//     };

//     const handleSignup = (username, password) => {
//         if (!username || !password) {
//             alert('아이디와 비밀번호를 입력해주세요.');
//             return false;
//         }

//         const userExists = users.some(user => user.username === username.trim());
//         if (userExists) {
//             alert('이미 존재하는 사용자 이름입니다.');
//             return false;
//         }

//         setUsers([...users, { username: username.trim(), password: password.trim() }]);
//         return true;
//     };

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} />} />
//                 <Route path="/login" element={<Login onLogin={handleLogin} users={users} />} />
//                 <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
//                 <Route path="/fireinformation" element={isLoggedIn ? <FireInformation /> : <Navigate to="/login" />} />
//                 <Route path="/report" element={isLoggedIn ? <Report /> : <Navigate to="/login" />} />
//                 <Route path="/feedback" element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import FireInformation from './components/FireInformation';
import Report from './components/Report';
import Feedback from './components/Feedback';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([{ username: 'admin', password: 'password' }]);

    const handleLogin = (username, password) => {
        if (!users || !Array.isArray(users)) {
            console.error('사용자 데이터가 올바르지 않습니다.');
            return false;
        }

        const userExists = users.some(
            user => user.username === username.trim() && user.password === password.trim()
        );

        if (userExists) {
            setIsLoggedIn(true);
            return true;
        }

        return false;
    };

    const handleSignup = (username, password) => {
        if (!username || !password) {
            alert('아이디와 비밀번호를 입력해주세요.');
            return false;
        }

        const userExists = users.some(user => user.username === username.trim());
        if (userExists) {
            alert('이미 존재하는 사용자 이름입니다.');
            return false;
        }

        setUsers([...users, { username: username.trim(), password: password.trim() }]);
        return true;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} users={users} />} />
                <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                
                {/* 로그인 상태를 확인하지 않고 직접 페이지로 이동 가능하게 수정 */}
                <Route path="/fireinformation" element={<FireInformation />} />
                <Route path="/report" element={<Report />} />
                <Route path="/feedback" element={<Feedback />} />
            </Routes>
        </Router>
    );
}

export default App;
