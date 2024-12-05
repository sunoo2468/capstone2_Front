// services/ReportServices.js
var { getAllPosts } = require('../repositories/ReportRepositories.js');  // 경로 수정

// history 테이블의 모든 데이터 가져오기
const fetchAllPosts = async () => {
  try {
    // Repository의 getAllPosts 호출
    const posts = await getAllPosts();
    return posts; // 결과 반환
  } catch (error) {
    console.error('Error in fetchAllPosts service:', error.message);
    throw error; // 에러를 호출자에게 전달
  }
};

module.exports = {
  fetchAllPosts
};
