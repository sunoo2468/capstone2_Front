import React, { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [showPredictResult, setShowPredictResult] = useState(false);
    const [predictResultData, setPredictResultData] = useState(null);

    const enablePredictResult = (data) => {
        if (!data) return;
        setShowPredictResult(true);
        setPredictResultData(data);
    };

    const resetSidebar = () => {
        setShowPredictResult(false);
        setPredictResultData(null);
    };

    return (
        <SidebarContext.Provider value={{ showPredictResult, enablePredictResult, resetSidebar, predictResultData }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
