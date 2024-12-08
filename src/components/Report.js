import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSidebar } from "./SidebarContext"; // SidebarContext 가져오기
import "./Report.css";

function Report() {
    const { predictResultData } = useSidebar(); // 예측 결과 데이터 가져오기
    const [reports, setReports] = useState([]); // 리포트 리스트 상태
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");
    const navigate = useNavigate(); // URL 이동을 위한 hook

    // predictResultData가 변경될 때 리포트 자동 추가
    useEffect(() => {
        if (!predictResultData){
            alert("예측 결과 데이터가 없습니다.");
            return;
        }

        const newReport = {
            id: reports.length + 1,
            reportURL: `/reports/${reports.length + 1}`,
            date: predictResultData.fireDate,
            summary: `화재 리포트 요약 ${reports.length + 1}`,
            views: 0,
            details: predictResultData, // 리포트 상세 데이터 저장
        };

        // 기존 리포트에 중복되지 않게 추가
        setReports((prevReports) => {
            const isDuplicate = prevReports.some((report) => report.date === newReport.date);
            return isDuplicate ? prevReports : [...prevReports, newReport];
        });
    }, [predictResultData, reports.length]); // predictResultData 또는 reports.length 변경 시 실행

    // 리포트 클릭 시 이동
    const handleReportClick = (report) => {
        navigate(report.reportURL);
    }; 

    // 검색 및 정렬된 리포트 필터링
    const filteredReports = reports
        .filter((report) =>
            report.summary.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "latest") return new Date(b.date) - new Date(a.date); // 최신순
            if (sortOrder === "oldes    t") return new Date(a.date) - new Date(b.date); // 오래된 순
            if (sortOrder === "most-viewed") return b.views - a.views; // 조회수 많은 순
            return 0;
        });   

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content">
                <h1>화재 리포트</h1>
                <div className="controls-container">
                    <input
                        type="text"
                        placeholder="찾고 싶은 리포트를 검색하시오."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="sort-select"
                    >
                        <option value="latest">최신순</option>
                        <option value="oldest">오래된 순</option>
                        <option value="most-viewed">조회수 많은 순</option>
                    </select>
                </div>
                <div className="report-list-container">
                    {filteredReports.length === 0 && (
                        <p className="no-results">검색 결과가 없습니다.</p>
                    )}
                    <ul className="report-list">
                        {filteredReports.map((report) => (
                            <li key={report.id} 
                                className="report-item"
                                onClick={() => handleReportClick(report)} // 클릭 이벤트
                            >
                                <strong>
                                    🔥 리포트 #{report.id} - {report.date}
                                </strong>
                                <p>{report.summary}</p>
                                <p className="views">조회수: {report.views}</p>
                                <p>URL: {report.reportURL}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Report;
