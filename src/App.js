import React, { useState } from "react";
import Home from "./components/Home";
import YearView from "./components/Yearview";
import Entry from "./components/Entry";
import Login from "./components/Login";
import Settings from "./components/Settings";

const App = () => {
    const [currentPage, setCurrentPage] = useState("login"); // Start with 'login'
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

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

    const handleMonthClick = (monthIndex) => {
        setSelectedMonth(monthIndex);
        setCurrentPage("home");
    };

    return (
        <div>
            {currentPage === "login" && <Login navigateToHome={navigateToHome} />}
            {currentPage === "home" && (
                <Home 
                selectedMonth={selectedMonth} 
                onToggleView={navigateToYearView} 
                navigateToEntry={navigateToEntry} 
                navigateToSettings={navigateToSettings} // Correctly passed
                />
            )}
            {currentPage === "year" && <YearView onMonthClick={handleMonthClick} />}
            {currentPage === "settings" && <Settings/>}
            {currentPage === "entry" && <Entry navigateToHome={navigateToHome} />} {/* Add back navigation */}

            
        </div>
    );
};

export default App;
