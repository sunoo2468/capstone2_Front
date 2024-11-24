// src/components/Report.js
import React from 'react';
import Sidebar from './Sidebar';
import './Report.css';

function Report() {
    const reports = [
        { id: 1, date: '2024-10-01', summary: 'House fire in downtown' },
        { id: 2, date: '2024-10-03', summary: 'Car fire on the highway' },
        { id: 3, date: '2024-10-05', summary: 'Wildfire spreading near the hills' },
    ];

    return (
        <div className="page-container">
            <Sidebar />
            <div className="content">
                <h1>Fire Reports</h1>
                <ul>
                    {reports.map((report) => (
                        <li key={report.id}>
                            <strong>Incident #{report.id}</strong> - {report.date}
                            <p>{report.summary}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Report;
