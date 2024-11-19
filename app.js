// 필요한 모듈 불러오기
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var xlsx = require('xlsx');
var axios = require('axios');
var pool = require('./pgConnect.js'); // PostgreSQL 연결

var app = express();

// 미들웨어 설정
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 정적 파일 서빙
app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(express.static(__dirname + '/public'));

// Multer 저장 설정
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var userDirectory = req.body.uploadPath || 'default_uploads';
        if (!fs.existsSync(userDirectory)) {
            fs.mkdirSync(userDirectory, { recursive: true });
        }
        cb(null, userDirectory);
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
var upload = multer({ storage: storage });
// API 키 및 URL 설정
var apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
var serviceKey = 'DSQRNtEytEgIHvSIiIc0BVZP6fHjNZvzWzJO7dZqPVURPfN0TLjYV89A6Ht4+Iv905FtGseBc/5Ji7sYOEcXcw==';

// 엑셀 파일 경로
var excelFilePath = '/Users/oseli/Desktop/캡스톤 2/기상청41_단기예보 조회서비스_오픈API활용가이드_(240715)/지역정보.xlsx';

// 엑셀 파일에서 대치값 찾기 함수
function getLocationCoordinates(city, district) {
	var workbook = xlsx.readFile(excelFilePath);
	var sheet = workbook.Sheets[workbook.SheetNames[0]]; // 첫 번째 시트
	var data = xlsx.utils.sheet_to_json(sheet);

	// 사용자가 입력한 시도(city)와 구(district)에 해당하는 항목 찾기
	var locationData = data.find(row => row['시도'] === city && row['구군'] === district);

	if (locationData) {
			return { nx: locationData['nx'], ny: locationData['ny'] };
	}
	return null; // 일치하는 값이 없으면 null 반환
}

// 라우팅 - 정적 HTML 파일 서빙
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/report', (req, res) => res.sendFile(path.join(__dirname, 'public', 'report.html')));

// 회원가입 처리
app.post('/signup', async (req, res) => {
    const { user_id, user_name, user_password, user_password_confirm, user_email, user_mobile, user_type } = req.body;

    if (user_password !== user_password_confirm) {
        return res.status(400).json({ result: "error", message: "Passwords do not match" });
    }

    try {
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const sql = `
            INSERT INTO user_table (user_id, user_name, user_password, user_email, user_mobile, user_type)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [user_id.trim(), user_name, hashedPassword, user_email, user_mobile, user_type];

        await pool.query(sql, values);
        res.status(200).json({ result: "ok", message: "Registration successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: "error", message: "Server error" });
    }
});

// 로그인 처리
app.post('/login', async (req, res) => {
    const { user_id, user_password } = req.body;

    const sql = 'SELECT * FROM user_table WHERE user_id = $1';
    try {
        const result = await pool.query(sql, [user_id]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ result: "error", message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(user_password, user.user_password);
        if (!isPasswordMatch) {
            return res.status(400).json({ result: "error", message: "Incorrect password" });
        }

        res.cookie('USER_COOKIE_KEY', JSON.stringify(user), { httpOnly: true });
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: "error", message: "Server error" });
    }
});

// 로그아웃 처리
app.get('/logout', (req, res) => {
    res.clearCookie('USER_COOKIE_KEY');
    res.redirect('/');
});

// 게시글 작성
app.post('/report', upload.single('attachment'), async (req, res) => {
    const { title, content, writer } = req.body;
    const file = req.file;

    if (!title || !content || !writer) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    const sql = `
        INSERT INTO report (title, content, writer, attachment_path, insert_time)
        VALUES ($1, $2, $3, $4, NOW())
    `;
    const values = [title, content, writer, file ? file.path : null];

    try {
        await pool.query(sql, values);
        res.status(201).json({
            message: '게시글 작성 완료',
            data: { title, content, writer, attachmentPath: file ? file.path : null }
        });
    } catch (err) {
        console.error('Error inserting report:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// 게시글 수정
app.put('/report/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, writer } = req.body;

    const sql = `
        UPDATE report
        SET title = $1, content = $2, writer = $3, update_time = NOW()
        WHERE idx = $4
    `;
    const values = [title || null, content || null, writer || null, id];

    try {
        await pool.query(sql, values);
        res.send('게시글이 성공적으로 수정되었습니다.');
    } catch (err) {
        console.error('Error updating report:', err);
        res.status(500).send('Server error');
    }
});

// 화재 정보 저장 및 날씨 정보 추가 처리
app.post('/submit-fire-info', async (req, res) => {
	const { city, district, date, time, otherData, trafficCondition, fireType, fireSize } = req.body;

	try {
			const coordinates = getLocationCoordinates(city, district);
			if (!coordinates) {
					return res.status(400).json({ success: false, message: '위치 정보가 엑셀에서 찾을 수 없습니다' });
			}

			const { nx, ny } = coordinates;

			const weatherResponse = await axios.get(apiUrl, {
					params: {
							serviceKey: serviceKey,
							pageNo: 1,
							numOfRows: 1000,
							dataType: 'JSON',
							base_date: date,
							base_time: time,
							nx: nx,
							ny: ny,
					},
			});

			const weatherData = weatherResponse.data.response.body.items.item;
			const weatherSummary = weatherData
					.filter(item => ['PTY', 'SKY'].includes(item.category))
					.map(item => ({ [item.category]: item.obsrValue }));


			const insertQuery = `
					INSERT INTO fire_incident (
							fire_date, 
							fire_time, 
							location, 
							weather, 
							traffic_condition, 
							fire_type, 
							fire_size
					) VALUES (
							$1, $2, $3, $4, $5, $6, $7
					)
			`;

			const weatherInfo = weatherSummary.map(item => `${Object.keys(item)[0]}: ${Object.values(item)[0]}`).join(', ');

			await client.query(insertQuery, [
					date,
					time,
					`${city} ${district}`,
					weatherInfo,
					trafficCondition,
					fireType,
					fireSize,
			]);

			await client.end();

			res.json({ success: true, message: '날씨 정보와 함께 데이터가 저장되었습니다', weatherSummary });
	} catch (error) {
			console.error(error);
			res.status(500).json({ success: false, message: '날씨 데이터 조회 또는 정보 저장 중 오류 발생' });
	}
});

// 서버 실행
app.listen(5000, () => console.log("Server is running on port 5000"));
