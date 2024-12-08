import React from "react";
import { useParams } from "react-router-dom";
import { useSidebar } from "./SidebarContext";

function ReportDetail() {
    const { id } = useParams();
    const { predictResultData } = useSidebar();

    if (!predictResultData) {
        return <h1>리포트 데이터를 찾을 수 없습니다.</h1>;
    }

    return (
        <div>
            <h1>리포트 #{id} 상세 정보</h1>
            <ul>
                <li>화재 발생 날짜: {predictResultData.fireDate}</li>
                <li>화재 발생 시간: {predictResultData.fireTime}</li>
                <li>화재 위치: {predictResultData.fireLocation}</li>
                <li>세부 위치: {predictResultData.subLocation}</li>
                <li>화재 유형: {predictResultData.fireType}</li>
                <li>화재 크기: {predictResultData.fireSize}</li>
                <li>혼잡도 상태: {predictResultData.traffic}</li>
            </ul>
        </div>
    );
}

export default ReportDetail;
