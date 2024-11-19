// src/components/QuickActions.js
import React from "react";
import "./QuickActions.css";
import { useNavigate } from "react-router-dom";

function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        { id: 1, text: "장비 및 소방차 관리", icon: "🧰🚒", description: "소방 장비와 차량 상태를 확인하고 관리하세요.", path: "/equipment-management" },
        { id: 2, text: "훈련 일정 및 기록", icon: "📅", description: "훈련 일정을 확인하고 참여 기록을 열람하세요.", path: "/training-schedule" },
        { id: 3, text: "업무 지침서 확인", icon: "📖", description: "상황별 업무 지침서와 대응 방법을 열람하세요.", path: "/standard-guidelines" },
        { id: 4, text: "대응 지침서 확인", icon: "🛠️", description: "화재 대응에 필요한 모든 지침을 확인하세요.", path: "/response-guidelines" },
    ];

    return (
        <div className="quick-actions-container">
            <h3>소방대원을 위한 빠른 액션</h3>
            <div className="action-cards">
                {actions.map((action) => (
                    <div key={action.id} className="action-card" onClick={() => navigate(action.path)}>
                        <div className="icon">{action.icon}</div>
                        <div className="content">
                            <h4>{action.text}</h4>
                            <p>{action.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuickActions;
