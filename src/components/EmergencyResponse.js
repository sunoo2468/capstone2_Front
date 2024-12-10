import React from 'react';
import './EmergencyResponse.css';

function EmergencyResponse() {
    return (
        <div className="response-container">
            <h1 className="response-title">대응 지침서 확인</h1>
            <p className="response-description">
                화재 발생 시 신속하고 안전하게 대응하기 위한 지침서입니다.
                아래 각 항목을 확인하여 필요한 정보를 숙지하세요.
            </p>

            <div className="response-section">
                <h2>📋 대응 절차</h2>
                <ul>
                    <li>화재 발견 즉시 119에 신고.</li>
                    <li>대피 경로를 확인하고 주변 사람들에게 알림.</li>
                    <li>화재 진압 장비(소화기, 물 등) 사용 시 개인 안전 우선.</li>
                    <li>소방대 도착 시 협조  및 대피 유도.</li>
                </ul>
            </div>

            <div className="response-section">
                <h2>🧯 소화기 사용법</h2>
                <ul>
                    <li>소화기 안전핀을 뽑습니다.</li>
                    <li>노즐을 화재 중심부로 향합니다.</li>
                    <li>손잡이를 힘껏 눌러 소화액 분사.</li>
                    <li>화염이 완전히 꺼질 때까지 분사 지속.</li>
                </ul>
            </div>

            <div className="response-section">
                <h2>🚨 대피 시 유의사항</h2>
                <ul>
                    <li>엘리베이터 사용 금지 - 계단 이용.</li>
                    <li>젖은 수건으로 코와 입을 막아 연기 흡입 방지.</li>
                    <li>낮은 자세로 이동하여 연기 피해 최소화.</li>
                    <li>안전 지역에 도착 후 화재 신고 및 구조 요청.</li>
                </ul>
            </div>

            <footer className="response-footer">
                화재 발생 시 침착하게 대응하고, 항상 안전을 최우선으로 생각하세요.
            </footer>
        </div>
    );
}

export default EmergencyResponse;
