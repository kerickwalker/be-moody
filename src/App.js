import React, { useState } from "react";
import Home from "./components/Home";
import YearView from "./components/Yearview";
import Entry from "./components/Entry";
import Login from "./components/Login";

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

    return (
        <div>
            {currentPage === "login" && <Login navigateToHome={navigateToHome} />}
            {currentPage === "home" && (
                <Home 
                    selectedMonth={new Date().getMonth() + 1} 
                    onToggleView={navigateToYearView} 
                />
            )}
            {currentPage === "year" && <YearView onMonthClick={() => setCurrentPage("home")} />}
            {currentPage === "entry" && <Entry />}
        </div>
    );
};

export default App;

