var bcrypt = require('bcrypt')
var signupRepository =require("../repositories/singupRepositories.js");  // 사용자 데이터 저장하는 repository

// 회원가입
async function signUp(userData) {
    const { user_id, user_name, user_password , user_email, user_mobile } = userData;

    // 1. 아이디 중복 확인
    const existingUser = await signupRepository.findById(user_id);
    if (existingUser) {
        const error = new Error('이미 존재하는 ID입니다.');
        error.code = 409;  // 충돌 오류: 이미 존재하는 ID
        throw error;
    }

    // 2. 비밀번호 확인
    if (user_password !== password_confirm) {
        const error = new Error('비밀번호가 일치하지 않습니다.');
        error.code = 400;  // 잘못된 요청: 비밀번호 불일치
        throw error;
    }

    // 3. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. 사용자 데이터베이스에 저장
    const newUser = await signupRepository.createUser({
        user_id,
        user_name,
        user_password: hashedPassword,
        user_email,
        user_mobile
    });

    return newUser;  // 새로 생성된 사용자 반환
}

// 중요 데이터는 필터링하여 반환 (예: 비밀번호는 포함되지 않음)
function filterSensitiveData(user) {
    const { password, ...rest } = user;
    return rest;
}


module.exports = {
	signUp,
	filterSensitiveData
};

