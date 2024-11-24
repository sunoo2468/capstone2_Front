var express = require('express');
var bcrypt  = require ('bcrypt');
var pool = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/pgConnect.js'); // PostgreSQL 연결 설정
const { findUserById, verifyPassword } = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/repositories/loginRepositories.js');
const LoginController = express.Router();

// 사용자 로그인 처리
LoginController.post('/login', async (req, res) => {
  const { user_id, user_password } = req.body;

  if (!user_id || !user_password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 모두 입력하세요.' });
  }

  try {
    // 사용자 검색
    const user = await findUserById(user_id);
    if (!user) {
      console.log(`사용자 ID ${user_id}를 찾을 수 없습니다.`);
      return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
    }

    console.log(`DB에서 가져온 사용자 데이터:`, user);

    // 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
    if (!isPasswordValid) {
      console.log('비밀번호 불일치:', { 입력된비밀번호: user_password, 저장된비밀번호: user.user_password });
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // 로그인 성공
    console.log(`사용자 ${user_id} 로그인 성공`);
    return res.status(200).json({ message: '로그인 성공', user_id: user.user_id });
  } catch (error) {
    console.error('로그인 처리 중 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});


module.exports = LoginController;
