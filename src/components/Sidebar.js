import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "./SidebarContext";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { showPredictResult, resetSidebar } = useSidebar(); 

    const handleLogoutClick = () => {
        resetSidebar(); 
        navigate("/logout", { state: { from: location.pathname } }); 
    };

    const menuItems = [
        { path: "/", label: "Dashboard" },
        { path: "/fireinformation", label: "Fire Information" },
        { path: "/predictresult", label: "Predict Result", condition: showPredictResult }, 
        { path: "/report", label: "Report" }
    ];

    return (
        <nav className="sidebar">
            <ul>
                {menuItems.map(
                    ({ path, label, condition = true }) =>
                        condition && (
                            <li key={path} className={location.pathname === path ? "active" : ""}>
                                <Link to={path}>{label}</Link>
                            </li>
                        )
                )}
                <li>
                    <button onClick={handleLogoutClick} className="logout-button">
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
