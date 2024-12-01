const axios = require('axios');
const xlsx = require('xlsx');
const readline = require('readline'); // readline 모듈을 사용하여 사용자 입력 받기

// API 관련 정보
const apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; 
const serviceKey = 'DSQRNtEytEgIHvSIiIc0BVZP6fHjNZvzWzJO7dZqPVURPfN0TLjYV89A6Ht4+Iv905FtGseBc/5Ji7sYOEcXcw=='; 

// 엑셀 파일 경로
var excelFilePath = '/Users/oseli/Desktop/캡스톤 2/기상청41_단기예보 조회서비스_오픈API활용가이드_(240715)/지역정보_최종.xlsx2';

// 엑셀 파일 읽기
var workbook = xlsx.readFile(excelFilePath);
var sheet = workbook.Sheets[workbook.SheetNames[0]];
var data = xlsx.utils.sheet_to_json(sheet);

// readline 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 도시와 지역에 해당하는 좌표 찾기
// 도시와 지역에 해당하는 좌표 찾기
function getLocationCoordinates(city, district) {
  // 엑셀 데이터에서 도시와 지역을 기준으로 nx, ny 값을 찾음
  var locationData = data.find(row => row[Object.keys(row)[0]] === city && row[Object.keys(row)[1]] === district);

  if (locationData) {
    // 해당 데이터가 있으면 nx, ny 값을 반환
    return { nx: locationData[Object.keys(locationData)[2]], ny: locationData[Object.keys(locationData)[3]] };
  }
  return null;
}


// 날짜, 시간, 좌표 정보 입력 받기
rl.question('날짜를 입력하세요 (예: 20241111): ', (dateInput) => {
  rl.question('시간을 입력하세요 (예: 1300): ', (timeInput) => {
    rl.question('도시를 입력하세요: ', (city) => {
      rl.question('지역을 입력하세요: ', (district) => {

        // 도시와 지역에 해당하는 좌표를 엑셀에서 찾기
        const coordinates = getLocationCoordinates(city, district);

        if (coordinates) {
          const nx = coordinates.nx;
          const ny = coordinates.ny;

          const base_date = dateInput; // 입력된 날짜
          const base_time = timeInput; // 입력된 시간

          // API 요청 쿼리 파라미터 설정
          const queryParams = `?serviceKey=${encodeURIComponent(serviceKey)}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;
          
          // API 요청 보내기
          axios.get(apiUrl + queryParams)
            .then(response => {
              const items = response.data.response.body.items.item;
 
              let weatherDescription = "간단한 날씨 정보:\n";
              let precipitation = "맑음"; // 기본값을 맑음으로 설정

              // PTY와 SKY 정보를 바탕으로 간단한 날씨 정보 해석
              items.forEach(item => {
                if (item.category === 'PTY') { // 강수 형태
                  precipitation = {
                    '0': '맑음',  // 비 없음
                    '1': '비',
                    '2': '비/눈',
                    '3': '눈',
                    '5': '이슬비'
                  }[item.obsrValue] || '알 수 없음';
                } else if (item.category === 'SKY' && precipitation === '맑음') {
                  precipitation = {
                    '1': '맑음',
                    '3': '구름 많음',
                    '4': '흐림'
                  }[item.obsrValue] || precipitation;
                }
              });

              weatherDescription += `현재 날씨: ${precipitation}\n`;
              console.log(weatherDescription);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        } else {
          console.log('해당 도시와 지역의 좌표를 찾을 수 없습니다.');
        }

        rl.close();
      });
    });
  });
});
