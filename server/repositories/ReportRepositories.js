const pool = require('../pgConnect.js'); // PostgreSQL 연결

// 게시글 목록 가져오기
const getAllPosts = async () => {
  const query = `
    SELECT id, fire_date, city, district
    FROM fire_incident
    ORDER BY id DESC
  `;

  try {
    const result = await pool.query(query);
    console.log(result.rows);  // 반환된 데이터 확인용 로그
    return result.rows; // 게시글 목록 반환
  } catch (error) {
    console.error('Error fetching posts from database:', error.message);
    throw error;
  }
};





module.exports = {
  getAllPosts
};
