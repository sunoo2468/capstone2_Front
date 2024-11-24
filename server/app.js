var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var pool = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/pgConnect.js'); // PostgreSQL 연결

var app = express();

// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // 또는 프론트엔드 도메인(http://localhost:3000)으로 제한
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


var loginRouter = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/routers/LoginRouters.js'); // 파일 경로 정확히 확인
var signupRouter = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/routers/SignupRouters.js'); // 파일 경로 정확히 확인



// React 빌드 파일 제공
app.use(express.static(path.join(__dirname, 'finalcap2', 'build')));

// React의 모든 경로를 index.html로 연결
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'finalcap2', 'build', 'index.html'));
});

app.use('/api', loginRouter);
app.use('/api', signupRouter);


// // Multer ?????? ??ㅼ??
// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 			var userDirectory = req.body.uploadPath || 'default_uploads';
// 			if (!fs.existsSync(userDirectory)) {
// 					fs.mkdirSync(userDirectory, { recursive: true });
// 			}
// 			cb(null, userDirectory);
// 	},
// 	filename: function (req, file, cb) {
// 			var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// 			cb(null, uniqueSuffix + '-' + file.originalname);
// 	}
// });
// var upload = multer({ storage: storage });
// // API
// var apiUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
// var serviceKey = 'DSQRNtEytEgIHvSIiIc0BVZP6fHjNZvzWzJO7dZqPVURPfN0TLjYV89A6Ht4+Iv905FtGseBc/5Ji7sYOEcXcw==';

// //엑셀 경로
// var excelFilePath = '/Users/oseli/Desktop/캡스톤 2/기상청41_단기예보 조회서비스_오픈API활용가이드_(240715)/지역정보.xlsx';

// // ?????? ?????쇱????? ???移?媛? 李얘린 ??⑥??
// function getLocationCoordinates(city, district) {
// var workbook = xlsx.readFile(excelFilePath);
// var sheet = workbook.Sheets[workbook.SheetNames[0]]; // 泥? 踰?吏? ??????
// var data = xlsx.utils.sheet_to_json(sheet);

// // ??ъ?⑹??媛? ?????ν?? ??????(city)??? 援?(district)??? ??대?뱁????? ???紐? 李얘린
// var locationData = data.find(row => row['??????'] === city && row['援ш뎔'] === district);

// if (locationData) {
// 		return { nx: locationData['nx'], ny: locationData['ny'] };
// }
// return null; // ??쇱???????? 媛???? ?????쇰㈃ null 諛????
// }


// 로그인
// app.post('/login', async (req, res) => {
//     const { user_id, user_password } = req.body;

//     const sql = 'SELECT * FROM user_table WHERE user_id = $1';
//     try {
//         const result = await pool.query(sql, [user_id]);
//         const user = result.rows[0];

//         if (!user) {
//             return res.status(400).json({ result: "error", message: "User not found" });
//         }

//         const isPasswordMatch = await bcrypt.compare(user_password, user.user_password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({ result: "error", message: "Incorrect password" });
//         }

//         res.cookie('USER_COOKIE_KEY', JSON.stringify(user), { httpOnly: true });
//         res.redirect('/dashboard');
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ result: "error", message: "Server error" });
//     }
// });

// // 로그아웃
// app.get('/logout', (req, res) => {
//     res.clearCookie('USER_COOKIE_KEY');
//     res.redirect('/');
// });

// // 寃????湲? ??????
// app.post('/report', upload.single('attachment'), async (req, res) => {
//     const { title, content, writer } = req.body;
//     const file = req.file;

//     if (!title || !content || !writer) {
//         return res.status(400).json({ message: '紐⑤?? ??????瑜? ?????ν?댁＜??몄??.' });
//     }

//     const sql = `
//         INSERT INTO report (title, content, writer, attachment_path, insert_time)
//         VALUES ($1, $2, $3, $4, NOW())
//     `;
//     const values = [title, content, writer, file ? file.path : null];

//     try {
//         await pool.query(sql, values);
//         res.status(201).json({
//             message: '寃????湲? ?????? ???猷?',
//             data: { title, content, writer, attachmentPath: file ? file.path : null }
//         });
//     } catch (err) {
//         console.error('Error inserting report:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // 寃????湲? ??????
// app.put('/report/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, content, writer } = req.body;

//     const sql = `
//         UPDATE report
//         SET title = $1, content = $2, writer = $3, update_time = NOW()
//         WHERE idx = $4
//     `;
//     const values = [title || null, content || null, writer || null, id];

//     try {
//         await pool.query(sql, values);
//         res.send('寃????湲???? ??깃났?????쇰?? ??????????????듬?????.');
//     } catch (err) {
//         console.error('Error updating report:', err);
//         res.status(500).send('Server error');
//     }
// });

// // ?????? ???蹂? ?????? 諛? ?????? ???蹂? 異?媛? 泥?由?
// app.post('/submit-fire-info', async (req, res) => {
// 	const { city, district, date, time, otherData, trafficCondition, fireType, fireSize } = req.body;

// 	try {
// 			const coordinates = getLocationCoordinates(city, district);
// 			if (!coordinates) {
// 					return res.status(400).json({ success: false, message: '???移? ???蹂닿?? ???????????? 李얠?? ??? ?????듬?????' });
// 			}

// 			const { nx, ny } = coordinates;

// 			const weatherResponse = await axios.get(apiUrl, {
// 					params: {
// 							serviceKey: serviceKey,
// 							pageNo: 1,
// 							numOfRows: 1000,
// 							dataType: 'JSON',
// 							base_date: date,
// 							base_time: time,
// 							nx: nx,
// 							ny: ny,
// 					},
// 			});

// 			const weatherData = weatherResponse.data.response.body.items.item;
// 			const weatherSummary = weatherData
// 					.filter(item => ['PTY', 'SKY'].includes(item.category))
// 					.map(item => ({ [item.category]: item.obsrValue }));


// 			const insertQuery = `
// 					INSERT INTO fire_incident (
// 							fire_date, 
// 							fire_time, 
// 							location, 
// 							weather, 
// 							traffic_condition, 
// 							fire_type, 
// 							fire_size
// 					) VALUES (
// 							$1, $2, $3, $4, $5, $6, $7
// 					)
// 			`;

// 			const weatherInfo = weatherSummary.map(item => `${Object.keys(item)[0]}: ${Object.values(item)[0]}`).join(', ');

// 			await client.query(insertQuery, [
// 					date,
// 					time,
// 					`${city} ${district}`,
// 					weatherInfo,
// 					trafficCondition,
// 					fireType,
// 					fireSize,
// 			]);

// 			await client.end();

// 			res.json({ success: true, message: '?????? ???蹂댁?? ??④?? ??곗?댄?곌?? ?????λ???????듬?????', weatherSummary });
// 	} catch (error) {
// 			console.error(error);
// 			res.status(500).json({ success: false, message: '?????? ??곗?댄?? 議고?? ?????? ???蹂? ?????? 以? ??ㅻ?? 諛????' });
// 	}
// });


app.listen(5000, () => console.log("Server is running on port 5000"));
