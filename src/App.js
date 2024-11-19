import React, { useState } from "react";
import Home from "./components/Home";
import YearView from "./components/Yearview";
import Entry from "./components/Entry";
import Login from "./components/Login";
import Settings from "./components/Settings";

const App = () => {
    const [currentPage, setCurrentPage] = useState("login"); // Start with 'login'

    // Navigation handlers
    const navigateToHome = () => {
        setCurrentPage("home");
    };

    const navigateToEntry = () => {
        setCurrentPage("entry");
    };

    const navigateToYearView = () => {
        setCurrentPage("year");
    };
    const navigateToSettings = () => {
        setCurrentPage("settings");
    };

    return (
        <div>
            {currentPage === "login" && <Login navigateToHome={navigateToHome} />}
            {currentPage === "home" && (
                <Home 
                    selectedMonth={new Date().getMonth() + 1} 
                    onToggleView={navigateToYearView} 
                    onNavigateToSettings={navigateToSettings}
                />
            )}
            {currentPage === "year" && <YearView onMonthClick={() => setCurrentPage("home")} />}
            {currentPage === "entry" && <Entry navigateToHome={navigateToHome} />}

            
        </div>
    );
};

export default App;
