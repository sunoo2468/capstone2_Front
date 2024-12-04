import React, { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [showPredictResult, setShowPredictResult] = useState(false);
    const [predictResultData, setPredictResultData] = useState(null); // PredictResult 데이터를 저장

    const enablePredictResult = (data) => {
        setShowPredictResult(true);
        setPredictResultData(data); // 데이터를 저장
    };

    const resetSidebar = () => {
        setShowPredictResult(false);
        setPredictResultData(null); // 데이터 초기화
    };

    return (
        <SidebarContext.Provider value={{ showPredictResult, enablePredictResult, resetSidebar, predictResultData }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
