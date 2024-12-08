import React from "react";
import { useParams } from "react-router-dom";
import { useSidebar } from "./SidebarContext";
import "./ReportDetail.css";

function ReportDetail() {
    const { id } = useParams(); // URL에서 id 가져오기
    const { predictResultData } = useSidebar(); // 전역 데이터 가져오기

    if (!predictResultData) {
        return <h1>리포트 데이터를 찾을 수 없습니다.</h1>;
    }

    return (
        <div className="report-detail-container">
            <h1>리포트 #{id} 상세 정보</h1>
            <ul className="report-detail-list">
                <li>
                    <strong>화재 발생 날짜:</strong> {predictResultData.fireDate}
                </li>
                <li>
                    <strong>화재 발생 시간:</strong> {predictResultData.fireTime}
                </li>
                <li>
                    <strong>화재 위치:</strong> {predictResultData.fireLocation}
                </li>
                <li>
                    <strong>세부 위치:</strong> {predictResultData.subLocation}
                </li>
                <li>
                    <strong>화재 유형:</strong> {predictResultData.fireType}
                </li>
                <li>
                    <strong>화재 크기:</strong> {predictResultData.fireSize}
                </li>
                <li>
                    <strong>혼잡도 상태:</strong> {predictResultData.traffic}
                </li>
            </ul>
        </div>
    );
}

export default ReportDetail;

