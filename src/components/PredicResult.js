import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom'; // 페이지 이동 후 데이터 전달 받기
// import { useSidebar } from "./SidebarContext"
import axios from 'axios';
import "./PredicResult.css";


const FeedbackInformation = () => {
  const location = useLocation();
  const [userInput, setUserInput] = useState(location.state?.userInput || {});
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPredictionResult = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/predicresult');
				if (response.data.success) {
					console.log('Fetched Prediction:', response.data.prediction);
					console.log('Fetched Fire Information:', response.data.fireInformation);
					setPredictionResult(response.data.prediction);
					setUserInput(response.data.fireInformation);
				} else {
					throw new Error(response.data.error || '예측 결과를 가져오는 데 실패했습니다.');
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
	
		fetchPredictionResult();
	}, []);
	

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const fireDate = userInput?.fire_date || '정보 없음';
  const fireTime = userInput?.fire_time || '정보 없음';
  const city = userInput?.city || '정보 없음';
  const district = userInput?.district || '정보 없음';
  const trafficCondition = userInput?.traffic_condition || '정보 없음';
  const fireType = userInput?.fire_type || '정보 없음';
  const fireSize = userInput?.fire_size || '정보 없음';
  const weather = userInput?.weather || '정보 없음';

	return (
		<div className="page-container">
				<Sidebar />
				<div className="content">
						<h1>예측 정보</h1>
						<div className="feedback-list-container">
								<h2>사용자 입력 정보</h2>
								<ul className="feedback-list">
								  <li className="feedback-item">
												<strong>화재 발생 날짜:</strong> {fireDate}
										</li>
										<li className="feedback-item">
												<strong>화재 발생 시간:</strong> {fireTime}
										</li>
										<li className="feedback-item">
												<strong>화재 위치:</strong> {city}
										</li>
										<li className="feedback-item">
												<strong>세부 위치:</strong> {district}
										</li>
										<li className="feedback-item">
												<strong>혼잡도 상태:</strong> {trafficCondition}
										</li>
										<li className="feedback-item">
												<strong>화재 유형:</strong> {fireType}
										</li>
										<li className="feedback-item">
												<strong>화재 크기:</strong> {fireSize}
										</li>
										<li className="feedback-item">
												<strong>날씨 :</strong> {weather}
										</li>
								</ul>
						</div>
						<div className="feedback-list-container">
								<h2>예측 결과</h2>
								<ul className="feedback-list">
										<li className="feedback-item">
												<strong>소방대원:</strong> {predictionResult.firefighter}
										</li>
										<li className="feedback-item">
												<strong>구급차:</strong> {predictionResult.ambulance}
										</li>
										<li className="feedback-item">
												<strong>소방차:</strong> {predictionResult.water}
										</li>
										<li className="feedback-item">
												<strong>사다리:</strong> {predictionResult.ladder}
										</li>
										<li className="feedback-item">
												<strong>펌프차:</strong> {predictionResult.pumper}
										</li>
								</ul>
						</div>
				</div>
		</div>
);
}

export default FeedbackInformation; // default export 추가
;
