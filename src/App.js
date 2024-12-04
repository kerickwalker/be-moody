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
    const [selectedMoodColor, setSelectedMoodColor] = useState(null);

    // Navigation handlers
    const navigateToHome = () => {
        setCurrentPage("home");
    };

    const navigateToEntry = (date, moodColor) => {
        setSelectedDate(date); 
        setSelectedMoodColor(moodColor); // Store mood color
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
                    selectedDate={selectedDate}
                    moodColor={selectedMoodColor} // Pass the mood color
                />
            )}

        </div>
    );
};

export default App;
