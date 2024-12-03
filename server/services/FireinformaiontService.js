const axios = require('axios');
const xlsx = require('xlsx');
const fireinformationrepository = require('../repositories/fireinformationRepository.js');

// 엑셀 파일 경로
const excelFilePath = '../../지역정보_최종.xlsx';
const workbook = xlsx.readFile(excelFilePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

// 도시와 지역에 해당하는 좌표 찾기
async function getLocationCoordinates(city, district) {
  // 엑셀 데이터에서 도시와 지역을 기준으로 nx, ny 값을 찾음
  var locationData = data.find(row => row.도시명 === city && row.지역명 === district); // 열 이름을 명시적으로 사용

  if (locationData) {
    // 해당 데이터가 있으면 nx, ny 값을 반환
    return { nx: locationData.nx, ny: locationData.ny };  // 명시적인 키 사용
  }
  return null;
}

// 날씨 정보 가져오기
async function getWeatherInfo(city, district, dateInput, timeInput) {
  try {
    // 위치 좌표 가져오기
    const coordinates = await getLocationCoordinates(city, district);

    if (!coordinates) {
      throw new Error('해당 위치의 좌표를 찾을 수 없습니다.');
    }

    const { nx, ny } = coordinates;
    const apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    const serviceKey = 'DSQRNtEytEgIHvSIiIc0BVZP6fHjNZvzWzJO7dZqPVURPfN0TLjYV89A6Ht4+Iv905FtGseBc/5Ji7sYOEcXcw==';

    // API 요청 쿼리 파라미터 설정
    const queryParams = `?serviceKey=${encodeURIComponent(serviceKey)}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${dateInput}&base_time=${timeInput}&nx=${nx}&ny=${ny}`;

    // 날씨 데이터 요청
    const response = await axios.get(apiUrl + queryParams);
    const items = response.data.response.body.items.item;

    let weatherCode = 0; // 기본값: 알 수 없음

    // 데이터 분석하여 weatherCode 설정
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

    // weatherCode에 따른 설명 매핑
    const weatherDescription = {
      1: '맑음',
      2: '구름많음',
      3: '흐림',
      4: '비',
      5: '눈',
      6: '습함',
      7: '바람'
    }[weatherCode] || '알 수 없음';

    return weatherDescription; // 날씨 정보 반환
  } catch (error) {
    throw new Error('날씨 정보를 가져오는 데 실패했습니다: ' + error.message);
  }
}


// 화재 정보 저장
async function saveFireInformation(fireInfo) {
  const { fire_date, fire_time, city, district, traffic_condition, fire_type, fire_size } = fireInfo;

  // 날씨 정보 가져오기
  const weatherDescription = await getWeatherInfo(city, district, fire_date, fire_time);

  // 리포지토리 호출로 DB에 저장
  await fireinformationrepository.insertFireInformation({
    fire_date,
    fire_time,
    city,
    district,
    traffic_condition,
    fire_type,
    fire_size,
    weather: weatherDescription
  });
}

module.exports = {
  getWeatherInfo,
  saveFireInformation
};
