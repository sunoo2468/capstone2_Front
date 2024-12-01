var express = require('express');
var FeedbackService = require('/Users/oseli/Desktop/캡스톤 2/코드/finalcap2/server/services/FeedbackService.js'); // 피드백 서비스
const FeedbackController = express.Router();

FeedbackController.get('/feedbackinformation', async (req, res) => {
  try {
    // 예측 및 데이터 저장 서비스 호출
    const prediction = await FeedbackService.predictFireAnalysisAndSave();

    // 예측 결과를 응답으로 반환
    res.status(200).json({ success: true, data: prediction });
  } catch (error) {
    console.error('Error in FeedbackController:', error);

    // 에러 응답 반환
    res.status(500).json({ 
      success: false, 
      error: '서버에서 예측을 처리하지 못했습니다.' 
    });
  }
});


module.exports = FeedbackController;
