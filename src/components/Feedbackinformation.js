import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom'; // 페이지 이동 후 데이터 전달 받기
import axios from 'axios';


const FeedbackInformation = () => {
  const location = useLocation();
  const [userInput, setUserInput] = useState(location.state?.userInput || {});
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPredictionResult = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/feedbackinformation');
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
    <div>
			<Sidebar />
			<div className="fire-info-container">
        <div className="fire-form-section">
			
      <h1>Feedback Information</h1>
      <h2>User Input</h2>
      <ul>
        <li><strong>Fire Date:</strong> {fireDate}</li>
        <li><strong>Fire Time:</strong> {fireTime}</li>
        <li><strong>City:</strong> {city}</li>
        <li><strong>District:</strong> {district}</li>
        <li><strong>Traffic Condition:</strong> {trafficCondition}</li>
        <li><strong>Fire Type:</strong> {fireType}</li>
        <li><strong>Fire Size:</strong> {fireSize}</li>
        <li><strong>Weather:</strong> {weather}</li>
      </ul>

      <h2>Prediction Result</h2>
      {predictionResult ? (
        <ul>
          <li><strong>Firefighter:</strong> {predictionResult.firefighter}</li>
          <li><strong>Ambulance:</strong> {predictionResult.ambulance}</li>
          <li><strong>Water:</strong> {predictionResult.water}</li>
          <li><strong>Ladder:</strong> {predictionResult.ladder}</li>
          <li><strong>Pumper:</strong> {predictionResult.pumper}</li>
        </ul>
      ) : (
        <p>No prediction results available.</p>
      )}
    </div>
		</div>
    </div>
  );
};

export default FeedbackInformation; // default export 추가
;
