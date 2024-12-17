import React from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "./SidebarContext"; 
import "./PredictResult.css";

function PredictResult() {
    const { predictResultData } = useSidebar(); 

    
    if (!predictResultData) {
        return (
            <div className="page-container">
                <Sidebar />
                <div className="content">
                    <h1>입력된 데이터가 없습니다.</h1>
                </div>
            </div>
        );
    }

   
    const { fireDate, fireTime, fireLocation, subLocation, fireType, fireSize, traffic } = predictResultData;

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content">
                <h1>예측 정보</h1>
                <div className="feedback-list-container">
                    <h2>사용자 입력 정보</h2>
                    <ul className="feedback-list">
                        <li className="feedback-item">
                            <strong>화재 발생 날짜:</strong> {fireDate}
                        </li>
                        <li className="feedback-item">
                            <strong>화재 발생 시간:</strong> {fireTime}
                        </li>
                        <li className="feedback-item">
                            <strong>화재 위치:</strong> {fireLocation}
                        </li>
                        <li className="feedback-item">
                            <strong>세부 위치:</strong> {subLocation}
                        </li>
                        <li className="feedback-item">
                            <strong>혼잡도 상태:</strong> {traffic}
                        </li>
                        <li className="feedback-item">
                            <strong>화재 유형:</strong> {fireType}
                        </li>
                        <li className="feedback-item">
                            <strong>화재 크기:</strong> {fireSize}
                        </li>
                    </ul>
                </div>
                <div className="feedback-list-container">
                    <h2>예측 결과</h2>
                    <ul className="feedback-list">
                        <li className="feedback-item">
                            <strong>소방대원:</strong> 36
                        </li>
                        <li className="feedback-item">
                            <strong>구급차:</strong> 5
                        </li>
                        <li className="feedback-item">
                            <strong>펌프트럭:</strong> 3
                        </li>
                        <li className="feedback-item">
                            <strong>물탱크차:</strong> 2
                        </li>
                        <li className="feedback-item">
                            <strong>사다리차:</strong> 2
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PredictResult;

