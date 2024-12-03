//DB와 server의 소통 
//login

const pool = require('../pgConnect.js'); // PostgreSQL 연결
const bcrypt = require('bcrypt');

/**
 * 주어진 사용자 ID로 사용자 데이터를 검색합니다.
 * @param {string} user_id - 검색할 사용자 ID.
 * @returns {Object|null} - 사용자 데이터 또는 null.
 */
async function findUserById(user_id) {
  const sql = 'SELECT * FROM user_table WHERE user_id = $1';
  
  try {
    // DB 조회
    const result = await pool.query(sql, [user_id]);
		console.log('DB Result:', result);
    // 사용자가 존재하면 사용자 데이터 반환, 없으면 null
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
    console.error('DB 조회 오류:', error);
    throw error; // 에러를 호출한 곳으로 전달
  }
}

/**
 * 사용자 입력 비밀번호와 데이터베이스의 해시된 비밀번호를 비교합니다.
 * @param {string} inputPassword - 사용자가 입력한 비밀번호.
 * @param {string} storedPassword - 데이터베이스에 저장된 해시된 비밀번호.
 * @returns {boolean} - 비밀번호가 일치하면 true, 아니면 false.
 */
async function verifyPassword(inputPassword, storedPassword) {
  try {
    console.log('Input Password:', inputPassword);  // 입력된 비밀번호 확인
    console.log('Stored Password:', storedPassword);  // 저장된 해시된 비밀번호 확인
    const match = await bcrypt.compare(inputPassword, storedPassword);
    console.log('Password Match:', match);  // 비밀번호 일치 여부 확인
    return match;
  } catch (error) {
    console.error('비밀번호 비교 오류:', error);
    throw error;
  }
}

module.exports = {
  findUserById,
  verifyPassword,
};
