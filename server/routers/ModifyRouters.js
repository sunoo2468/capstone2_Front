const express = require('express');
const ModifyServices = require('../services/ModifyServices.js');
const { pool } = require('../pgConnect.js'); // PostgreSQL 연결

const ModifyController = express.Router();

// 특정 게시글 정보 가져오기 (GET 요청)
ModifyController.get('/report/:id', async (req, res) => {
  const postId = req.params.id;  // URL에서 id 값을 가져옴

  try {
    // getFireInformationAndPrediction을 호출하여 fireInformation과 prediction 데이터를 가져옵니다.
		console.log(`Fetching data for postId: ${postId}`);
    const { fireInformation, prediction } = await ModifyServices.getFireInformationAndPrediction(postId);

    res.status(200).json({
      success: true,
      fireInformation,
      prediction,
    });
  } catch (error) {
    console.error('Error in ModifyController:', error);
    res.status(500).json({
      success: false,
      error: '서버에서 데이터를 가져오는 중 오류가 발생했습니다.',
    });
  }
});


ModifyController.post('/report/:id', async (req, res) => {
  const postId = req.params.id;  // URL에서 report_id 가져오기
  const { firefighter, ambulance, water, ladder, pumper, input } = req.body; // 클라이언트에서 전달한 데이터

  try {
    // Modify 데이터 삽입
    const insertedData = await ModifyServices.insertModify(postId, firefighter, ambulance, water, ladder, pumper, input);

    res.status(201).json({
      success: true,
      message: 'Modify 정보가 성공적으로 추가되었습니다.',
      insertedData,  // 새로 추가된 데이터 반환
    });
  } catch (error) {
    console.error('Error inserting modify data in ModifyController:', error);
    res.status(500).json({
      success: false,
      error: 'Modify 정보를 추가하는 중 오류가 발생했습니다.',
    });
  }
});



ModifyController.patch('/report/:id', async (req, res) => {
  const postId = req.params.id; // URL에서 report_id 가져오기
  const { firefighter, ambulance, water, ladder, pumper, input } = req.body; // 수정할 값들 받아오기

  try {
    // Modify 데이터 수정
    const updatedData = await ModifyServices.updateModify(postId, firefighter, ambulance, water, ladder, pumper, input);

    res.status(200).json({
      success: true,
      message: 'Modify 정보가 성공적으로 수정되었습니다.',
      updatedData,  // 수정된 데이터 반환
    });
  } catch (error) {
    console.error('Error updating modify data in ModifyController:', error);
    res.status(500).json({
      success: false,
      error: 'Modify 정보를 수정하는 중 오류가 발생했습니다.',
    });
  }
});

module.exports = ModifyController;
