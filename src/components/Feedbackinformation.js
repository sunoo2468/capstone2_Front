import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Feedbackinformation.css';
import axios from 'axios'; // axios 추가

const FeedbackInformation = () => {
  const [feedbackInformation, setFeedbackInformation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // DB에서 feedbackinformation 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedbackinformation');
        setFeedbackInformation(response.data); // 가져온 데이터로 상태 업데이트
      } catch (error) {
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

	return (
    <div className="page-container">
      <Sidebar />
      <div className="fire-info-container">
        <div className="fire-form-section">
          <h1>Fire Incidents</h1>
          <ul>
            {feedbackInformation.map((incident) => (
              <li key={incident.id}>
                <p>Fire Date: {incident.fire_date}</p>
                <p>Fire Time: {incident.fire_time}</p>
                <p>City: {incident.city}</p>
                <p>District: {incident.district}</p>
                <p>Traffic Condition: {incident.traffic_condition}</p>
                <p>Fire Type: {incident.fire_type}</p>
                <p>Fire Size: {incident.fire_size}</p>
                <p>Weather: {incident.weather}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default FeedbackInformation;
