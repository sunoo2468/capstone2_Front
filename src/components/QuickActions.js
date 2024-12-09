import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickActions.css';

function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="quick-actions-container">
            <h3>소방대원을 위한 빠른 액션</h3>
            <div className="quick-actions-wrapper">
                <div className="action-card" onClick={() => navigate('/equipment')}>
                    <div className="icon">🚒</div>
                    <h4>장비 및 소방차 관리</h4>
                    <p>소방 장비와 차량 상태를 확인하고 관리하세요.</p>
                </div>
                <div className="action-card" onClick={() => navigate('/schedule')}>
                    <div className="icon">📅</div>
                    <h4>훈련 일정 및 기록</h4>
                    <p>훈련 일정을 확인하고 참여 기록을 입력하세요.</p>
                </div>
                <div className="action-card" onClick={() => navigate('/guidelines')}>
                    <div className="icon">📘</div>
                    <h4>업무 지침서 확인</h4>
                    <p>상황별 업무 지침서를 확인하세요.</p>
                </div>
                <div className="action-card" onClick={() => navigate('/response')}>
                    <div className="icon">🛠️</div>
                    <h4>대응 지침서 확인</h4>
                    <p>화재 대응에 필요한 모든 지침을 확인하세요.</p>
                </div>
            </div>
        </div>
    );
}

export default QuickActions;
