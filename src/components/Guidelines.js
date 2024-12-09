// src/components/Guidelines.js
import React from 'react';
import './Guidelines.css';

function Guidelines() {
    return (
        <div className="guidelines-container">
            <h1 className="guidelines-title">업무 지침서 확인</h1>
            <p className="guidelines-description">화재 대응 및 업무 수행을 위한 지침서를 확인하세요.</p>

            <div className="guidelines-section">
                <h2>1. 화재 발생 시 초기 대응</h2>
                <ul>
                    <li>화재 경보기를 울리고 모든 직원과 주민들에게 알립니다.</li>
                    <li>가까운 소방서에 즉시 연락하세요. (소방서 전화번호: 119)</li>
                    <li>화재 초기 진압이 가능하다면, 비치된 소화기를 사용하세요.</li>
                </ul>
            </div>

            <div className="guidelines-section">
                <h2>2. 대피 절차</h2>
                <ul>
                    <li>대피 경로를 따라 신속하게 건물을 떠나세요.</li>
                    <li>엘리베이터 사용을 금지하고 계단을 이용하세요.</li>
                    <li>대피 후 지정된 안전 장소에서 직원들의 안전을 확인하세요.</li>
                </ul>
            </div>

            <div className="guidelines-section">
                <h2>3. 장비 관리 지침</h2>
                <ul>
                    <li>소화기, 소방 호스 등의 장비를 정기적으로 점검하세요.</li>
                    <li>비상구와 소방 장비의 접근을 방해하지 않도록 유지하세요.</li>
                    <li>장비 점검 기록을 보관하고 관리하세요.</li>
                </ul>
            </div>

            <div className="guidelines-section">
                <h2>4. 보고 및 기록</h2>
                <ul>
                    <li>화재 발생 후, 자세한 사고 보고서를 작성하세요.</li>
                    <li>사고 원인 분석 및 예방 조치를 기록하세요.</li>
                    <li>보고서는 소방청 및 회사의 안전 관리 부서에 제출합니다.</li>
                </ul>
            </div>

            <div className="guidelines-footer">
                <p>업무 지침서에 대해 궁금한 점이 있다면, <strong>안전 관리팀</strong>에 문의하세요.</p>
            </div>
        </div>
    );
}

export default Guidelines;
