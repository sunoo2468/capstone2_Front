// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSidebar } from './SidebarContext';
// import Sidebar from './Sidebar';
// import './FireInformation.css';

// const locations = {
//     "서울특별시": ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"],
//     "부산광역시": ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
//     "대구광역시": ["군위군", "중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
//     "인천광역시": ["미추홀구", "중구", "동구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
//     "광주광역시": ["동구", "서구", "남구", "북구", "광산구"],
//     "대전광역시": ["동구", "중구", "서구", "유성구", "대덕구"],
//     "울산광역시": ["중구", "남구", "동구", "북구", "울주군"],
//     "세종특별자치시": ["세종특별자치시"],
//     "경기도": ["부천시원미구", "부천시소사구", "부천시오정구", "수원시장안구", "수원시권선구", "수원시팔달구", "수원시영통구", "성남시수정구", "성남시중원구", "성남시분당구", "의정부시", "안양시만안구", "안양시동안구", "광명시", "평택시", "동두천시", "안산시상록구", "안산시단원구", "고양시덕양구", "고양시일산동구", "고양시일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시처인구", "용인시기흥구", "용인시수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
//     "강원특별자치도": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
//   };

// function FireInformation() {
//     const navigate = useNavigate();
//     const { enablePredictResult } = useSidebar();
//     const [fireData, setFireData] = useState({
//         fireTime: '',
//         fireLocation: '',
//         subLocation: '',
//         fireType: '',
//         fireSize: '',
//         weather: '',
//         traffic: ''
//     });

//     const [showPictograms, setShowPictograms] = useState({
//         map: false,
//         weather: false,
//         traffic: false,
//         fireType: false
//     });

//     const handleLocationChange = (e) => {
//         const selectedLocation = e.target.value;
//         setFireData({
//             ...fireData,
//             fireLocation: selectedLocation,
//             subLocation: '' // 상위 항목이 변경될 때 하위 항목 초기화
//         });
//         setShowPictograms({ ...showPictograms, map: true });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFireData({ ...fireData, [name]: value });

//         // 상태별로 픽토그램 표시 설정
//         if (name === 'weather') {
//             setShowPictograms({ ...showPictograms, weather: true });
//         } else if (name === 'traffic') {
//             setShowPictograms({ ...showPictograms, traffic: true });
//         } else if (name === 'fireType') {
//             setShowPictograms({ ...showPictograms, fireType: true });
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert(`Fire reported at ${fireData.fireLocation} ${fireData.subLocation}. Fire Type: ${fireData.fireType}`);
//         enablePredictResult(fireData);
//         navigate('/predictresult');
//     };

//     return (
//         <div className="page-container">
//             <Sidebar />
//             <div className="fire-info-container">
//                 {/* 왼쪽 입력 폼 */}
//                 <div className="fire-form-section">
//                     <h1>실시간 대응 방안</h1>
//                     <form onSubmit={handleSubmit} className="fire-form">
//                         <label>화재 발생 시간:</label>
//                         <input type="datetime-local" name="fireTime" value={fireData.fireTime} onChange={handleChange} />

//                         <label>화재 위치:</label>
//                         <select name="fireLocation" value={fireData.fireLocation} onChange={handleLocationChange}>
//                             <option value="">화재 위치 선택</option>
//                             {Object.keys(locations).map((location) => (
//                                 <option key={location} value={location}>
//                                     {location}
//                                 </option>
//                             ))}
//                         </select>

//                         {fireData.fireLocation && (
//                             <>
//                                 <label>구/군 선택:</label>
//                                 <select name="subLocation" value={fireData.subLocation} onChange={(e) => handleChange(e)}>
//                                     <option value="">구/군 선택</option>
//                                     {locations[fireData.fireLocation].map((subLocation) => (
//                                         <option key={subLocation} value={subLocation}>
//                                             {subLocation}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </>
//                         )}

//                         <label>날씨 상황:</label>
//                         <select name="weather" value={fireData.weather} onChange={handleChange}>
//                             <option value="">날씨 선택</option> {/* 기본 선택 옵션 추가 */}
//                             <option value="맑음">맑음</option>
//                             <option value="흐림">흐림</option>
//                             <option value="비">비</option>
//                             <option value="눈">눈</option>
//                             <option value="폭우">폭우</option>
//                             <option value="바람">바람</option>
//                             <option value="습함">습함</option>
//                         </select>

//                         <label>혼잡도 상태:</label>
//                         <select name="traffic" value={fireData.traffic} onChange={handleChange}>
//                             <option value="">혼잡도 선택</option> {/* 기본 선택 옵션 추가 */}
//                             <option value="여유">여유</option>
//                             <option value="보통">보통</option>
//                             <option value="혼잡">혼잡</option>
//                             <option value="매우혼잡">매우혼잡</option>
//                         </select>

//                         <label>화재 유형:</label>
//                         <select name="fireType" value={fireData.fireType} onChange={handleChange}>
//                             <option value="">화재 유형 선택</option> {/* 기본 선택 옵션 추가 */}
//                             <option value="산업용">산업용</option>
//                             <option value="차량">차량</option>
//                             <option value="산불">산불</option>
//                             <option value="그 외">그 외</option>
//                         </select>

//                         <label>화재 크기:</label>
//                         <div>
//                             <label className="radio-label">
//                                 <input type="radio" name="fireSize" value="소" checked={fireData.fireSize === '소'} onChange={handleChange} /> 소
//                             </label>
//                             <label className="radio-label">
//                                 <input type="radio" name="fireSize" value="중" checked={fireData.fireSize === '중'} onChange={handleChange} /> 중
//                             </label>
//                             <label className="radio-label">        
//                                 <input type="radio" name="fireSize" value="대" checked={fireData.fireSize === '대'} onChange={handleChange} /> 대
//                             </label>
//                             <label className="radio-label">    
//                                 <input type="radio" name="fireSize" value="특대" checked={fireData.fireSize === '특대'} onChange={handleChange} /> 특대
//                             </label>
//                         </div>

//                         <button type="submit" className="submit-button">제출하기</button>
//                     </form>
//                 </div>

//                 {/* 오른쪽 픽토그램 섹션 */}
//                 <div className="fire-pictogram-section">
//                     {showPictograms.map && (
//                         <div className="pictogram map-icon">
//                             <p>지도</p>
//                         </div>
//                     )}
//                     {showPictograms.weather && (
//                         <div className="pictogram weather-icon">
//                             <p>날씨</p>
//                         </div>
//                     )}
//                     {showPictograms.traffic && (
//                         <div className="pictogram traffic-icon">
//                             <p>교통</p>
//                         </div>
//                     )}
//                     {showPictograms.fireType && (
//                         <div className="pictogram fire-type-icon">
//                             <p>유형</p>
//                             <div className="fire-icon" style={{ transform: `scale(${fireData.fireSize === '소' ? 0.5 : fireData.fireSize === '중' ? 0.7 : fireData.fireSize === '대' ? 1 : 1.2})` }}>
//                                 🔥
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FireInformation;



//weather 항목이 삭제된 경우
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from './SidebarContext';
import Sidebar from './Sidebar';
import './FireInformation.css';

const locations = {
    "서울특별시": ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"],
    "부산광역시": ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
    "대구광역시": ["군위군", "중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
    "인천광역시": ["미추홀구", "중구", "동구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
    "광주광역시": ["동구", "서구", "남구", "북구", "광산구"],
    "대전광역시": ["동구", "중구", "서구", "유성구", "대덕구"],
    "울산광역시": ["중구", "남구", "동구", "북구", "울주군"],
    "세종특별자치시": ["세종특별자치시"],
    "경기도": ["부천시원미구", "부천시소사구", "부천시오정구", "수원시장안구", "수원시권선구", "수원시팔달구", "수원시영통구", "성남시수정구", "성남시중원구", "성남시분당구", "의정부시", "안양시만안구", "안양시동안구", "광명시", "평택시", "동두천시", "안산시상록구", "안산시단원구", "고양시덕양구", "고양시일산동구", "고양시일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시처인구", "용인시기흥구", "용인시수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
    "강원특별자치도": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
  };

function FireInformation() {
    const navigate = useNavigate();
    const { enablePredictResult } = useSidebar();
    const [fireData, setFireData] = useState({
        fireTime: '',
        fireLocation: '',
        subLocation: '',
        fireType: '',
        fireSize: '',
        traffic: ''
    });

    const [showPictograms, setShowPictograms] = useState({
        map: false,
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
        if (name === 'traffic') {
            setShowPictograms({ ...showPictograms, traffic: true });
        } else if (name === 'fireType') {
            setShowPictograms({ ...showPictograms, fireType: true });
        }
        else if (name === 'fireSize') {
            setShowPictograms({ ...showPictograms, fireSize: true });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Fire reported at ${fireData.fireLocation} ${fireData.subLocation}. Fire Type: ${fireData.fireType}`);
        enablePredictResult(fireData);
        navigate('/predictresult');
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

                        <label>혼잡도 상태:</label>
                        <select name="traffic" value={fireData.traffic} onChange={handleChange}>
                            <option value="">혼잡도 선택</option>
                            <option value="여유">여유</option>
                            <option value="보통">보통</option>
                            <option value="혼잡">혼잡</option>
                            <option value="매우혼잡">매우혼잡</option>
                        </select>

                        <label>화재 유형:</label>
                        <select name="fireType" value={fireData.fireType} onChange={handleChange}>
                            <option value="">화재 유형 선택</option>
                            <option value="산업용">산업용</option>
                            <option value="차량">차량</option>
                            <option value="산불">산불</option>
                            <option value="그 외">그 외</option>
                        </select>

                        <label>화재 크기:</label>
                        <div>
                            <label className="radio-label">
                                <input type="radio" name="fireSize" value="소" checked={fireData.fireSize === '소'} onChange={handleChange} /> 소
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="fireSize" value="중" checked={fireData.fireSize === '중'} onChange={handleChange} /> 중
                            </label>
                            <label className="radio-label">        
                                <input type="radio" name="fireSize" value="대" checked={fireData.fireSize === '대'} onChange={handleChange} /> 대
                            </label>
                            <label className="radio-label">    
                                <input type="radio" name="fireSize" value="특대" checked={fireData.fireSize === '특대'} onChange={handleChange} /> 특대
                            </label>
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
                    {showPictograms.traffic && (
                        <div className="pictogram traffic-icon">
                            <p>교통</p>
                        </div>
                    )}
                    {showPictograms.fireSize && (
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
