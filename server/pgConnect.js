const { Pool } = require('pg');

const pool = new Pool({
    user: 'oseli',       // PostgreSQL 사용자 이름
    host: 'localhost',            // 호스트, 보통 로컬 환경에서는 'localhost'
    database: 'cap_2',             // 데이터베이스 이름
    password: 'dhtpfl',    // PostgreSQL 비밀번호
    port: 5432,                   // PostgreSQL 기본 포트
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to cap2 database:', err.stack);
    } else {
        console.log('Connected to cap2 database.');
    }
});


module.exports = pool;