import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./Report.css";

function Report() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");

    // 더미 데이터 생성
    const reports = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        date: new Date(2024, 9, 30 - (index % 30)), // 날짜를 생성
        summary: `리포트 요약 #${index + 1}`,
        views: Math.floor(Math.random() * 100), // 조회 수
    }));

    // 검색 필터 및 정렬
    const filteredReports = reports
        .filter((report) =>
            report.summary.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "latest") return b.date - a.date; // 최신순
            if (sortOrder === "oldest") return a.date - b.date; // 오래된 순
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
                            <li key={report.id} className="report-item">
                                <strong>
                                    🔥 리포트 #{report.id} -{" "}
                                    {report.date.toISOString().split("T")[0]}
                                </strong>
                                <p>{report.summary}</p>
                                <p className="views">조회수: {report.views}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Report;
