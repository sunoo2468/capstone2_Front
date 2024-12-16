import React from "react";
import Calendar from "react-calendar"; // 캘린더 라이브러리
import "react-calendar/dist/Calendar.css"; // 기본 캘린더 스타일
import "./TrainingSchedule.css"; // 커스텀 스타일

function TrainingSchedule() {
    const trainingData = [
        {
            date: "2024-12-15",
            location: "서울 소방훈련소",
            type: "화재 대피 훈련",
            participants: 30,
            description: "고층 건물 화재 상황을 가정한 대피 훈련",
        },
        {
            date: "2024-12-22",
            location: "부산 소방훈련소",
            type: "소방차 진입 훈련",
            participants: 25,
            description: "도심 교통 상황에서 소방차 신속 진입 훈련",
        },
        {
            date: "2024-12-30",
            location: "대구 소방센터",
            type: "재난 구조 훈련",
            participants: 40,
            description: "재난 구조 및 응급 구조 훈련 시뮬레이션",
        },
    ];

    return (
        <div className="training-schedule-container">
            <h1 className="page-title">훈련 일정 및 기록</h1>
            <p className="page-description">
                아래는 예정된 소방 훈련 일정 및 기록입니다. 훈련을 통해 대비 태세를 강화합니다.
            </p>

            {/* 캘린더 섹션 */}
            <div className="calendar-section">
                <Calendar className="calendar" />
                <p className="current-date">
                    오늘은 <strong>2024-12-10</strong> 입니다.
                </p>
            </div>

            {/* 훈련 일정 섹션 */}
            <div className="training-cards-section">
                {trainingData.map((training, index) => (
                    <div className="training-card" key={index}>
                        <h2 className="training-date">{training.date}</h2>
                        <p className="training-location">
                            <strong>장소:</strong> {training.location}
                        </p>
                        <p className="training-type">
                            <strong>훈련 유형:</strong> {training.type}
                        </p>
                        <p className="training-participants">
                            <strong>참여 인원:</strong> {training.participants}명
                        </p>
                        <p className="training-description">{training.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrainingSchedule;
