import React, { useState } from 'react';
import './EquipmentManagement.css';

function EquipmentManagement() {
    // 예제 데이터를 위한 상태
    const [equipment, setEquipment] = useState([
        { id: 1, name: '소방차 A', status: '정상', lastInspection: '2024-12-01' },
        { id: 2, name: '소방차 B', status: '정비 필요', lastInspection: '2024-11-20' },
        { id: 3, name: '소화기 세트', status: '정상', lastInspection: '2024-12-03' },
        { id: 4, name: '방화복 세트', status: '점검 필요', lastInspection: '2024-11-18' },
    ]);

    return (
        <div className="equipment-management">
            <h1>장비 및 소방차 관리</h1>
            <p>소방 장비와 소방차의 상태를 확인하고 관리하세요.</p>

            <table className="equipment-table">
                <thead>
                    <tr>
                        <th>장비 이름</th>
                        <th>상태</th>
                        <th>마지막 점검일</th>
                        <th>작업</th>
                    </tr>
                </thead>
                <tbody>
                    {equipment.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.status}</td>
                            <td>{item.lastInspection}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        alert(`${item.name}의 상태를 업데이트합니다.`)
                                    }
                                >
                                    상태 업데이트
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EquipmentManagement;
