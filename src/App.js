import React, { useState } from "react";
import Home from "./components/Home";
import YearView from "./components/Yearview";
import Entry from "./components/Entry";
import Login from "./components/Login";
import Settings from "./components/Settings";

const App = () => {
    const [currentPage, setCurrentPage] = useState("login"); // Start with 'login'
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(null); // Track the selected date

    // Navigation handlers
    const navigateToHome = () => {
        setCurrentPage("home");
    };

    const navigateToEntry = (date) => {
        setSelectedDate(date); // Set the selected date before navigating
        setCurrentPage("entry");
    };


    const navigateToYearView = () => {
        setCurrentPage("year");
    };

    const navigateToSettings = () => {
        setCurrentPage("settings");
    };
    const navigateTologin = () => {
        setCurrentPage("login");
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
                    navigateToEntry={navigateToEntry} // Pass down navigateToEntry with date handling
                    navigateToSettings={navigateToSettings}
                />
            )}
            {currentPage === "year" && <YearView onMonthClick={handleMonthClick} />}
            {currentPage === "settings" && (
                <Settings 
                navigateToHome={navigateToHome} 
                navigateTologin={navigateTologin}

                /> // Pass navigateToHome for back navigation
            )}
            {currentPage === "entry" && (
                <Entry
                    navigateToHome={navigateToHome}
                    selectedDate={selectedDate} // Pass the selected date to Entry
                />
            )}
        </div>
    );
};

export default App;
