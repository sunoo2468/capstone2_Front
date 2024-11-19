const express = require('express');
const axios = require('axios');
const xlsx = require('xlsx');
const { Client } = require('pg');  // pg 라이브러리 임포트
const app = express();
app.use(express.json());

// API 키 및 URL 설정
const apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
const serviceKey = 'DSQRNtEytEgIHvSIiIc0BVZP6fHjNZvzWzJO7dZqPVURPfN0TLjYV89A6Ht4+Iv905FtGseBc/5Ji7sYOEcXcw==';

// 엑셀 파일 경로
const excelFilePath = '/Users/oseli/Desktop/캡스톤 2/기상청41_단기예보 조회서비스_오픈API활용가이드_(240715)/지역정보.xlsx';



// 엑셀 파일에서 대치값 찾기 함수
function getLocationCoordinates(city, district) {
  const workbook = xlsx.readFile(excelFilePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫 번째 시트
  const data = xlsx.utils.sheet_to_json(sheet);

  // 사용자가 입력한 시도(city)와 구(district)에 해당하는 항목 찾기
  const locationData = data.find(row => row['시도'] === city && row['구군'] === district);
  
  if (locationData) {
    return { nx: locationData['nx'], ny: locationData['ny'] };
  }
  return null; // 일치하는 값이 없으면 null 반환
}

// 폼 제출을 처리하는 라우트
app.post('/submit-fire-info', async (req, res) => {
  const { city, district, date, time, otherData, trafficCondition, fireType, fireSize } = req.body;

  try {
    // 엑셀에서 시도(city)와 구(district)에 해당하는 좌표 가져오기
    const coordinates = getLocationCoordinates(city, district);
    if (!coordinates) {
      return res.status(400).json({ success: false, message: '위치 정보가 엑셀에서 찾을 수 없습니다' });
    }

    const { nx, ny } = coordinates;

    // 날씨 정보 조회
    const weatherResponse = await axios.get(apiUrl, {
      params: {
        serviceKey: serviceKey,
        pageNo: 1,
        numOfRows: 1000,
        dataType: 'JSON',
        base_date: date, // 사용자가 입력한 날짜
        base_time: time, // 사용자가 입력한 시간
        nx: nx,          // 엑셀에서 찾은 nx 좌표
        ny: ny,          // 엑셀에서 찾은 ny 좌표
      },
    });

    // 날씨 데이터에서 필요한 정보 추출
    const weatherData = weatherResponse.data.response.body.items.item;
    const weatherSummary = weatherData
      .filter(item => ['PTY', 'SKY'].includes(item.category)) // 강수 형태, 하늘 상태 등 필요한 정보 필터링
      .map(item => ({ [item.category]: item.obsrValue }));

    // PostgreSQL에 데이터 삽입
    await client.connect();  // 데이터베이스 연결

    const insertQuery = `
      INSERT INTO fire_incident (
        fire_date, 
        fire_time, 
        location, 
        weather, 
        traffic_condition, 
        fire_type, 
        fire_size
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )
    `;
    
    const weatherInfo = weatherSummary.map(item => `${Object.keys(item)[0]}: ${Object.values(item)[0]}`).join(', '); // 날씨 정보를 문자열로 변환

    await client.query(insertQuery, [
      date,            // 화재 발생 날짜
      time,            // 화재 발생 시간
      `${city} ${district}`,  // 화재 발생 위치
      weatherInfo,     // 날씨 정보
      trafficCondition,  // 교통 상황
      fireType,        // 화재 유형
      fireSize         // 화재 크기
    ]);

    await client.end();  // 데이터베이스 연결 종료

    res.json({ success: true, message: '날씨 정보와 함께 데이터가 저장되었습니다', weatherSummary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '날씨 데이터 조회 또는 정보 저장 중 오류 발생' });
  }
});

app.listen(3000, () => console.log('서버가 포트 3000에서 실행 중입니다'));
