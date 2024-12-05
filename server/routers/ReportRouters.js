var express = require('express');
var ReportServices= require('../services/ReportServices.js'); // 피드백 서비스

const ReportController = express.Router();

ReportController.get('/report', async (req, res) => {
  try {
    const posts = await ReportServices.fetchAllPosts(); // 모든 게시글 가져오기

    res.status(200).json({ 
      success: true, 
      posts: posts // 게시글 리스트 반환
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ 
      success: false, 
      error: '게시글을 가져오는 중 오류가 발생했습니다.' 
    });
  }
});



module.exports = ReportController;
