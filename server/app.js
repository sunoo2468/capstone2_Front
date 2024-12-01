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
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

var loginRouter = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/routers/LoginRouters.js'); // 파일 경로 정확히 확인
var signupRouter = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/routers/SignupRouters.js'); // 파일 경로 정확히 확인
var FireinformationRouter = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/routers/FireInformationRouters.js'); // 파일 경로 정확히 확인
var FeedbackRouter = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/routers/FeedbackRouters.js'); // 파일 경로 정확히 확인

// // React 빌드 파일 제공 코드 주석 처리 (빌드 안 했으므로 필요 없음)
// app.use(express.static(path.join(__dirname, 'finalcap2', 'build')));

// // React의 모든 경로를 index.html로 연결 코드 주석 처리
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'finalcap2', 'build', 'index.html'));
// });

// API 라우터 설정
app.use('/api', loginRouter);
app.use('/api', signupRouter);
app.use('/api', FireinformationRouter);
app.use('/api', FeedbackRouter);
// server.js
app.use((req, res, next) => {
  if (req.url.includes('%08')) {
    console.error('Invalid URL detected:', req.url);
    return res.status(400).send('Invalid request URL.');
  }
  next();
});
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}, Method: ${req.method}`);
  next();
});


/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
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
