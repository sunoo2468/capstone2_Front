// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { SidebarProvider } from './components/SidebarContext';
// import Dashboard from './components/Dashboard';
// import EquipmentManagement from './components/EquipmentManagement';
// import TrainingSchedule from './components/TrainingSchedule';
// import Guidelines from './components/Guidelines';
// import EmergencyResponse from './components/EmergencyResponse';
// import NoticePannel from './components/NoticePannel';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import FireInformation from './components/FireInformation';
// import PredictResult from './components/PredictResult';
// import Report from './components/Report';
// import ReportContext from "./components/ReportContext";
// import Feedback from './components/Feedback';
// import Logout from './components/Logout';

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [users, setUsers] = useState([{ username: 'admin', password: 'password' }]);
//     const [allReports, setAllReports] = useState([]);

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

//     const handleLogout = () => {
//             setIsLoggedIn(false); // 로그인 상태 초기화
//     };

//     return (
//         <SidebarProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} />} />
//                     <Route path="/equipment" element={<EquipmentManagement />} />
//                     <Route path="/schedule" element={<TrainingSchedule />} />
//                     <Route path="/guidelines" element={<Guidelines />} />
//                     <Route path="/response" element={<EmergencyResponse />} />
//                     <Route path="/noticepannel" element={<NoticePannel />} />
//                     <Route path="/login" element={<Login onLogin={handleLogin} users={users} />} />
//                     <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
//                     <Route path="/logout" element={<Logout onLogout={handleLogout} users={users} />} />
//                     <Route path="/fireinformation" element={isLoggedIn ? <FireInformation /> : <Navigate to="/login" />} />
//                     <Route path="/predictResult" element={<PredictResult />} />
//                     <Route path="/reports/:id" element={<ReportContext />} />
//                     <Route path="/report" element={isLoggedIn ? <Report allReports={allReports} /> : <Navigate to="/login" />} />
//                     <Route path="/reports/:id" element={<ReportContext allReports={allReports} setAllReports={setAllReports} />} />
//                     <Route path="/feedback" element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />} />
//                     <Route path="*" element={<Navigate to="/" />} /> {/* 알 수 없는 경로 리디렉션 */}
//                 </Routes>
//             </Router>
//         </SidebarProvider>
//     );
// }


// export default App;


/* 로그인 상태를 확인하지 않고 직접 페이지로 이동 가능하게 수정 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SidebarProvider } from './components/SidebarContext';
import Dashboard from './components/Dashboard';
import EquipmentManagement from './components/EquipmentManagement';
import TrainingSchedule from './components/TrainingSchedule';
import Guidelines from './components/Guidelines';
import EmergencyResponse from './components/EmergencyResponse';
import NoticePannel from './components/NoticePannel';
import Login from './components/Login';
import Signup from './components/Signup';
import FireInformation from './components/FireInformation';
import PredictResult from './components/PredictResult';
import Report from './components/Report';
import ReportContext from "./components/ReportContext";
import Feedback from './components/Feedback';
import Logout from './components/Logout';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([{ username: 'admin', password: 'password' }]);
    const [allReports, setAllReports] = useState([]);

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

    const handleLogout = () => {
            setIsLoggedIn(false); // 로그인 상태 초기화
    };

    return (
        <SidebarProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard isLoggedIn={isLoggedIn} />} />
                    <Route path="/equipment" element={<EquipmentManagement />} />
                    <Route path="/schedule" element={<TrainingSchedule />} />
                    <Route path="/guidelines" element={<Guidelines />} />
                    <Route path="/response" element={<EmergencyResponse />} />
                    <Route path="/noticepannel" element={<NoticePannel />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} users={users} />} />
                    <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                    <Route path="/logout" element={<Logout onLogout={handleLogout} users={users} />} />
                    
                    {/* 로그인 상태를 확인하지 않고 직접 페이지로 이동 가능하게 수정 */}
                    <Route path="/fireinformation" element={<FireInformation />} />
                    <Route path="/predictResult" element={<PredictResult />} />
                    <Route path="/report" element={<Report allReports={allReports} />} />
                    <Route path="/reports/:id" element={<ReportContext allReports={allReports} setAllReports={setAllReports} />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="*" element={<Navigate to="/" />} /> {/* 알 수 없는 경로 리디렉션 */}
                </Routes>
            </Router>
        </SidebarProvider>
    );
}

export default App;
