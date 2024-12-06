const pool = require('../pgConnect.js'); // PostgreSQL 연결


// FireInformation 가져오기
const getFireInformationAndPrediction = async (postId) => {
  const fireQuery = `
    SELECT *
    FROM fire_incident
    WHERE id = $1;
  `;
  const predictionQuery = `
    SELECT *
    FROM history
    WHERE id = $1;
  `;
  
  const values = [postId];

  try {
    // 두 개의 쿼리 동시에 실행
    const [fireResult, predictionResult] = await Promise.all([
      pool.query(fireQuery, values), // fire_incident 데이터
      pool.query(predictionQuery, values) // history 데이터
    ]);

    // 결과를 객체 형태로 반환
    return {
      fireInformation: fireResult.rows[0], // fire_incident 테이블의 첫 번째 행
      prediction: predictionResult.rows[0] // history 테이블의 첫 번째 행
    };
  } catch (error) {
    console.error(`Error fetching data for id ${postId}:`, error.message);
    throw error;
  }
};


// Modify 데이터 삽입
const insertModify = async (postId, firefighter, ambulance, water, ladder, pumper, input) => {
  const query = `
    INSERT INTO modify (report_id, firefighter, ambulance, water, ladder, pumper, input)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [postId, firefighter, ambulance, water, ladder, pumper, input];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting data into modify table:', error.message);
    throw error;
  }
};

// Modify 데이터 수정
const updateModify = async (postId, firefighter, ambulance, water, ladder, pumper, input) => {
  const query = `
    UPDATE modify
    SET firefighter = $1,
        ambulance = $2,
        water = $3,
        ladder = $4,
        pumper = $5,
        input = $6
    WHERE report_id = $7
    RETURNING *;
  `;
  const values = [firefighter, ambulance, water, ladder, pumper, input, postId];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating data in modify table for report_id ${postId}:`, error.message);
    throw error;
  }
};

module.exports = {
  getFireInformationAndPrediction,
  insertModify,
  updateModify,
};
