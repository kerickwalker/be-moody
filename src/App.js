import React, { useState } from 'react';
import Home from './components/Home';
import YearView from './components/Yearview';

const App = () => {
    const [currentView, setCurrentView] = useState('month'); // Default to 'month'
    const [selectedMonth, setSelectedMonth] = useState(null); // Holds the selected month

    const toggleView = () => {
        setCurrentView((prevView) => (prevView === 'month' ? 'year' : 'month'));
    };

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
        setCurrentView('month');
    };

    return (
        <div>
            {currentView === 'year' && <YearView onMonthClick={handleMonthClick} />}
            {currentView === 'month' && (
                <Home 
                    selectedMonth={selectedMonth || new Date().getMonth() + 1} 
                    onToggleView={toggleView} 
                />
            )}
        </div>
    );
};

export default App;

