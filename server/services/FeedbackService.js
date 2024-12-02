

// services/FeedbackService.js
var { spawn } = require('child_process');
var { getLatestInput, savePredictionResult,FireInformation} = require('../repositories/FeedbackRepositories.js');  // 경로 수정
var pool = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/pgConnect.js'); // PostgreSQL 연결

// Python 모델 실행 함수
const runPythonModel = async (inputData) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/Feedback.py', JSON.stringify(inputData)]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python Error:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(result));
        } catch (error) {
          reject(new Error('Python 결과를 JSON으로 변환하는 데 실패했습니다.'));
        }
      } else {
        reject(new Error(`Python 프로세스 종료 코드: ${code}`));
      }
    });
  });
};

// 예측 분석 및 결과 저장 함수
const predictFireAnalysisAndSave = async () => {
  try {
    // 데이터베이스에서 최신 입력 데이터 가져오기
    const latestData = await getLatestInput();

    if (!latestData) {
      throw new Error('No latest fire incident data found.');
    }

    // Python 모델 실행
    const predictionResult = await runPythonModel({
      weather: latestData.weather,
      traffic_condition: latestData.traffic_condition,
      fire_size: latestData.fire_size || 0, // null 처리
      fire_type: latestData.fire_type,
    });

    // 예측 결과를 데이터베이스에 저장
    await savePredictionResult(predictionResult);

    return predictionResult; // 결과 반환
  } catch (error) {
    console.error('Error in predictFireAnalysisAndSave:', error);
    throw error;
  }
};

const UserFireInformation = async () => {
  try {
    // 최신 입력 데이터를 fire_incident 테이블에서 조회 (가장 최근 데이터 1개)
    const latestData = await FireInformation();

    return latestData ? latestData : null; // 최신 데이터 반환, 없으면 null 반환
  } catch (error) {
    console.error('Error in getLatestInput:', error);
    throw error; // 에러 처리
  }
};


module.exports = { 
  runPythonModel,
  predictFireAnalysisAndSave,
	UserFireInformation
};
