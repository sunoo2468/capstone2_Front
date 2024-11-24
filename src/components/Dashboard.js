// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ isLoggedIn }) {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            {/* 상단 네비게이션 바 */}
            <header className="navbar">
                <h1 className="logo">화재 대응 시스템</h1>
                <nav className="nav-links">
                    <a onClick={() => navigate('/fireinformation')}>화재 정보</a>
                    <a onClick={() => navigate('/report')}>리포트</a>
                    <a onClick={() => navigate('/feedback')}>피드백</a>
                </nav>
            </header>

            {/* 히어로 섹션 */}
            <section className="hero-section">
                <div className="hero-content">
                    <h2>화재 대응 시스템에 오신 것을 환영합니다</h2>
                    <p>실시간 화재 정보와 안전 지침을 통해 신속한 대응을 지원합니다.</p>
                    {!isLoggedIn ? (
                        <button className="login-button" onClick={() => navigate('/login')}>로그인</button>
                    ) : (
                        <p className="welcome-message">안녕하세요, 사용자님! 아래에서 대시보드를 확인하세요.</p>
                    )}
                </div>
            </section>

            {/* 대시보드 메인 콘텐츠 */}
            <div className="dashboard-content">
                {/* 왼쪽 패널: 주요 통계 */}
                <aside className="metrics-panel">
                    <h3>실시간 통계</h3>
                    <p>현재 화재 건수: 12</p>
                    <p>투입된 소방대원 수: 54</p>
                    <p>평균 대응 시간: 7분</p>
                    <button onClick={() => navigate('/statistics')}>자세한 통계 보기</button>
                </aside>

                {/* 가운데 패널: 지도와 라이브 리포트 */}
                <section className="main-panel">
                    <div className="map-container">
                        <h3>인터랙티브 지도</h3>
                        {/* 지도 자리 */}
                        <div className="map-placeholder">[지도]</div>
                    </div>
                    <div className="live-reports">
                        <h3>실시간 리포트</h3>
                        <p>리포트 #1: 도심 화재 - 통제 중</p>
                        <p>리포트 #2: 주거 지역 화재 경보</p>
                        <button onClick={() => navigate('/reports')}>모든 리포트 보기</button>
                    </div>
                </section>

                {/* 오른쪽 패널: 빠른 링크 */}
                <aside className="quick-links-panel">
                    <h3>빠른 액션</h3>
                    <button onClick={() => navigate('/report-fire')}>화재 신고하기</button>
                    <button onClick={() => navigate('/emergency-contacts')}>긴급 연락처</button>
                    <button onClick={() => navigate('/guidelines')}>화재 안전 지침</button>
                </aside>
            </div>
        </div>
    );
}

export default Dashboard;