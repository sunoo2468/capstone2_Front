const ModifyRepositories = require('../repositories/ModifyRepositories.js');
const { pool } = require('../pgConnect.js'); // PostgreSQL 연결


// FireInformation 가져오기
const getFireInformationAndPrediction = async (postId) => {
  try {
    // 두 개의 쿼리를 동시에 실행
    const [fireResult, predictionResult] = await Promise.all([
      ModifyRepositories.getFireInformationAndPrediction(postId), // fire_incident 데이터
     
    ]);

    // 결과를 객체 형태로 반환
    return {
      fireResult, predictionResult
    };
  } catch (error) {
    console.error(`Error fetching fire information and prediction for id ${postId}:`, error.message);
    throw error;
  }
};

// Modify 데이터 삽입
const insertModify = async (postId, firefighter, ambulance, water, ladder, pumper, input) => {
  try {
    // 레포지토리의 insertModify 함수 호출
    const insertedData = await ModifyRepositories.insertModify(postId, firefighter, ambulance, water, ladder, pumper, input);
    return insertedData;  // 삽입된 데이터 반환
  } catch (error) {
    console.error(`Error inserting data in modify service: ${error.message}`);
    throw error;  // 에러 발생 시 처리
  }
};

// Modify 데이터 수정
const updateModify = async (postId, firefighter, ambulance, water, ladder, pumper, input) => {
  try {
    const updatedData = await ModifyRepositories.updateModify(postId, firefighter, ambulance, water, ladder, pumper, input);
    return updatedData;
  } catch (error) {
    console.error(`Error updating data in modify table in service: ${error.message}`);
    throw error;
  }
};


module.exports = {
  getFireInformationAndPrediction,
  insertModify,
  updateModify
};
