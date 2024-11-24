import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './FireInformation.css';

const locations = {
    "서울특별시": ["강남구", "강동구", "강북구", "강서구"],
    "부산광역시": ["해운대구", "수영구", "사하구"],
    "대구광역시": ["중구", "동구", "서구"],
    "인천광역시": ["남동구", "부평구", "연수구"],
    // 필요한 다른 지역과 하위 소속을 추가하세요.
};

function FireInformation() {
    const [fireData, setFireData] = useState({
        fireTime: '',
        fireLocation: '',
        subLocation: '',
        fireType: '산업용',
        fireSize: '중',
        weather: '맑음',
        traffic: 'light'
    });

    const [showPictograms, setShowPictograms] = useState({
        map: false,
        weather: false,
        traffic: false,
        fireType: false
    });

    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setFireData({
            ...fireData,
            fireLocation: selectedLocation,
            subLocation: '' // 상위 항목이 변경될 때 하위 항목 초기화
        });
        setShowPictograms({ ...showPictograms, map: true });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFireData({ ...fireData, [name]: value });

        // 상태별로 픽토그램 표시 설정
        if (name === 'weather') {
            setShowPictograms({ ...showPictograms, weather: true });
        } else if (name === 'traffic') {
            setShowPictograms({ ...showPictograms, traffic: true });
        } else if (name === 'fireType') {
            setShowPictograms({ ...showPictograms, fireType: true });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Fire reported at ${fireData.fireLocation} ${fireData.subLocation}. Fire Type: ${fireData.fireType}`);
    };

    return (
        <div className="page-container">
            <Sidebar />
            <div className="fire-info-container">
                {/* 왼쪽 입력 폼 */}
                <div className="fire-form-section">
                    <h1>실시간 대응 방안</h1>
                    <form onSubmit={handleSubmit} className="fire-form">
                        <label>화재 발생 시간:</label>
                        <input type="datetime-local" name="fireTime" value={fireData.fireTime} onChange={handleChange} />

                        <label>화재 위치:</label>
                        <select name="fireLocation" value={fireData.fireLocation} onChange={handleLocationChange}>
                            <option value="">화재 위치 선택</option>
                            {Object.keys(locations).map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>

                        {fireData.fireLocation && (
                            <>
                                <label>구/군 선택:</label>
                                <select name="subLocation" value={fireData.subLocation} onChange={(e) => handleChange(e)}>
                                    <option value="">구/군 선택</option>
                                    {locations[fireData.fireLocation].map((subLocation) => (
                                        <option key={subLocation} value={subLocation}>
                                            {subLocation}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        <label>날씨 상황:</label>
                        <select name="weather" value={fireData.weather} onChange={handleChange}>
                            <option value="맑음">맑음</option>
                            <option value="흐림">흐림</option>
                            <option value="비">비</option>
                            <option value="눈">눈</option>
                        </select>

                        <label>혼잡도 상태:</label>
                        <select name="traffic" value={fireData.traffic} onChange={handleChange}>
                            <option value="여유">여유</option>
                            <option value="보통">보통</option>
                            <option value="혼잡">혼잡</option>
                        </select>

                        <label>화재 유형:</label>
                        <select name="fireType" value={fireData.fireType} onChange={handleChange}>
                            <option value="산업용">산업용</option>
                            <option value="차량">차량</option>
                            <option value="산불">산불</option>
                            <option value="그 외">그 외</option>
                        </select>

                        <label>화재 크기:</label>
                        <div>
                            <input type="radio" name="fireSize" value="소" checked={fireData.fireSize === '소'} onChange={handleChange} /> 소
                            <input type="radio" name="fireSize" value="중" checked={fireData.fireSize === '중'} onChange={handleChange} /> 중
                            <input type="radio" name="fireSize" value="대" checked={fireData.fireSize === '대'} onChange={handleChange} /> 대
                            <input type="radio" name="fireSize" value="특대" checked={fireData.fireSize === '특대'} onChange={handleChange} /> 특대
                        </div>

                        <button type="submit" className="submit-button">제출하기</button>
                    </form>
                </div>

                {/* 오른쪽 픽토그램 섹션 */}
                <div className="fire-pictogram-section">
                    {showPictograms.map && (
                        <div className="pictogram map-icon">
                            <p>지도</p>
                        </div>
                    )}
                    {showPictograms.weather && (
                        <div className="pictogram weather-icon">
                            <p>날씨</p>
                        </div>
                    )}
                    {showPictograms.traffic && (
                        <div className="pictogram traffic-icon">
                            <p>교통</p>
                        </div>
                    )}
                    {showPictograms.fireType && (
                        <div className="pictogram fire-type-icon">
                            <p>유형</p>
                            <div className="fire-icon" style={{ transform: `scale(${fireData.fireSize === '소' ? 0.5 : fireData.fireSize === '중' ? 0.7 : fireData.fireSize === '대' ? 1 : 1.2})` }}>
                                🔥
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FireInformation;
