const axios = require('axios');
const xlsx = require('xlsx');
const pool = require('../pgConnect.js'); // PostgreSQL 연결

// 엑셀 파일 경로
const excelFilePath = '../지역정보_최종.xlsx';

const workbook = xlsx.readFile(excelFilePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

// 도시와 지역에 해당하는 좌표 찾기
async function getLocationCoordinates(city, district) {
  var locationData = data.find(row => row[Object.keys(row)[0]] === city && row[Object.keys(row)[1]] === district);

  if (locationData) {
    // 해당 데이터가 있으면 nx, ny 값을 반환
    console.log('좌표 찾기 성공:', {
      city,
      district,
      nx: locationData[Object.keys(locationData)[2]],
      ny: locationData[Object.keys(locationData)[3]]
    });
    return { nx: locationData[Object.keys(locationData)[2]], ny: locationData[Object.keys(locationData)[3]] };
  }

  console.error('좌표 찾기 실패:', { city, district });
  return null;
}

// 날씨 정보 가져오기
async function getWeatherInfo(city, district, dateInput, timeInput) {
  const coordinates = await getLocationCoordinates(city, district); // `await` 추가로 비동기 함수 처리
  if (!coordinates) {
    throw new Error('해당 위치의 좌표를 찾을 수 없습니다.');
  }

  const { nx, ny } = coordinates;
  console.log('날씨 정보 요청:', { nx, ny, dateInput, timeInput });

  const apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; 
  const serviceKey = 'DSQRNtEytEgIHvSIiIc0BVZP6fHjNZvzWzJO7dZqPVURPfN0TLjYV89A6Ht4+Iv905FtGseBc/5Ji7sYOEcXcw==';

  // API 요청 쿼리 파라미터 설정
  const queryParams = `?serviceKey=${encodeURIComponent(serviceKey)}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${dateInput}&base_time=${timeInput}&nx=${nx}&ny=${ny}`;

  try {
    const response = await axios.get(apiUrl + queryParams);
    const items = response.data.response.body.items.item;
    let weatherCode = 0; // 기본값: 알 수 없음

    items.forEach(item => {
        if (item.category === 'PTY') { // 강수 형태
            weatherCode = {
                '0': 1, // 맑음
                '1': 4, // 비
                '2': 4, // 비/눈
                '3': 5, // 눈
                '5': 4, // 이슬비
                '6': 5, // 빗방울눈날림
                '7': 5  // 눈날림
            }[item.obsrValue] || weatherCode;
        } else if (item.category === 'SKY' && weatherCode === 1) { // 하늘 상태 (맑음일 경우만 업데이트)
            weatherCode = {
                '1': 1, // 맑음
                '3': 2, // 구름많음
                '4': 3  // 흐림
            }[item.obsrValue] || weatherCode;
        } else if (item.category === 'REH' && item.obsrValue >= 80) { // 습함
            weatherCode = 6;
        } else if (item.category === 'WSD' && item.obsrValue >= 4) { // 바람
            weatherCode = 7;
        }
    });
		const weatherDescription = {
      1: '맑음',
      2: '구름많음',
      3: '흐림',
      4: '비',
      5: '눈',
      6: '습함',
      7: '바람'
    }[weatherCode] || '알 수 없음';


		console.log('날씨 코드 최종 값:', weatherDescription); // 최종 weatherCode 값 출력
    return weatherCode; // 날씨 정보 반환
} catch (error) {
    console.error('날씨 정보 가져오기 실패:', error.message, {
        nx,
        ny,
        dateInput,
        timeInput,
        city,
        district
    });
    throw new Error('날씨 정보를 가져오는 데 실패했습니다.');
}}



// 화재 정보 DB에 저장
async function insertFireInformation(fireInfo, weatherDescription) {
  const { fire_date, fire_time, city, district, traffic_condition, fire_type, fire_size } = fireInfo;

  const sql = `
    INSERT INTO fire_incident (fire_date, fire_time, city, district, traffic_condition, fire_type, fire_size, weather)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  try {
    // 로그를 통해 입력되는 값 확인
    console.log('DB 저장 시작:', { 
      fire_date, 
      fire_time, 
      city, 
      district, 
      traffic_condition, 
      fire_type, 
      fire_size, 
      weatherDescription 
    });

    // 쿼리 실행
    const result = await pool.query(sql, [
      fire_date,
      fire_time,
      city,
      district,
      traffic_condition,
      fire_type,
      fire_size,
      weatherDescription
    ]);

    // 결과 출력 (성공적인 DB 저장 여부 확인)
    console.log('DB 저장 완료:', result.rowCount, '행이 삽입되었습니다.');
  } catch (error) {
    // 오류 발생 시 세부 사항과 함께 로그를 기록
    console.error('DB 저장 오류:', error.message, {
      fire_date,
      fire_time,
      city,
      district,
      traffic_condition,
      fire_type,
      fire_size,
      weatherDescription
    });

    // 에러 메시지 전달
    throw new Error('DB 저장 오류: ' + error.message);
  }
}

module.exports = {
  getLocationCoordinates,
  getWeatherInfo,
  insertFireInformation
};
