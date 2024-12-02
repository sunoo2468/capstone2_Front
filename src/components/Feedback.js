import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Feedback.css";

function FeedbackInformation() {
    const [userInput, setUserInput] = useState({});
    const [predictionResult, setPredictionResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 더미 데이터 생성
    const dummyData = {
        success: true,
        fireInformation: {
            fire_date: "2024-12-01",
            fire_time: "15:30",
            city: "서울",
            district: "강남구",
            traffic_condition: "혼잡",
            fire_type: "건물 화재",
            fire_size: "대형",
            weather: "맑음",
        },
        prediction: {
            firefighter: 5,
            ambulance: 2,
            water: "500L",
            ladder: 1,
            pumper: 1,
        },
    };

    useEffect(() => {
        const fetchPredictionResult = async () => {
            try {
                // 서버 연결 대신 더미 데이터 사용
                const response = dummyData;
                if (response.success) {
                    setUserInput(response.fireInformation);
                    setPredictionResult(response.prediction);
                } else {
                    throw new Error("데이터를 가져오는 데 실패했습니다.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPredictionResult();
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error}</div>;

    const {
        fire_date = "정보 없음",
        fire_time = "정보 없음",
        city = "정보 없음",
        district = "정보 없음",
        traffic_condition = "정보 없음",
        fire_type = "정보 없음",
        fire_size = "정보 없음",
        weather = "정보 없음",
    } = userInput;

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content">
                <h1>예측 정보</h1>
                <div className="feedback-list-container">
                    <h2>사용자 입력 정보</h2>
                    <ul className="feedback-list">
                        <li className="feedback-item">
                            <strong>화재 날짜:</strong> {fire_date}
                        </li>
                        <li className="feedback-item">
                            <strong>화재 시간:</strong> {fire_time}
                        </li>
                        <li className="feedback-item">
                            <strong>도시:</strong> {city}
                        </li>
                        <li className="feedback-item">
                            <strong>구역:</strong> {district}
                        </li>
                        <li className="feedback-item">
                            <strong>교통 상황:</strong> {traffic_condition}
                        </li>
                        <li className="feedback-item">
                            <strong>화재 유형:</strong> {fire_type}
                        </li>
                        <li className="feedback-item">
                            <strong>화재 크기:</strong> {fire_size}
                        </li>
                        <li className="feedback-item">
                            <strong>날씨:</strong> {weather}
                        </li>
                    </ul>
                </div>
                <div className="feedback-list-container">
                    <h2>예측 결과</h2>
                    {predictionResult ? (
                        <ul className="feedback-list">
                            <li className="feedback-item">
                                <strong>소방대원:</strong> {predictionResult.firefighter}
                            </li>
                            <li className="feedback-item">
                                <strong>구급차:</strong> {predictionResult.ambulance}
                            </li>
                            <li className="feedback-item">
                                <strong>물:</strong> {predictionResult.water}
                            </li>
                            <li className="feedback-item">
                                <strong>사다리:</strong> {predictionResult.ladder}
                            </li>
                            <li className="feedback-item">
                                <strong>펌프차:</strong> {predictionResult.pumper}
                            </li>
                        </ul>
                    ) : (
                        <p className="no-results">예측 결과가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FeedbackInformation;
