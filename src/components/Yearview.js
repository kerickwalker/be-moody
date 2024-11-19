import React from 'react';
import '../styles/Yearview.css';

const YearView = ({ onMonthClick }) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="year-view">
            
            <h1>Year View</h1>
            <div className="months-grid">
                {months.map((month, index) => (
                    <div
                        key={index}
                        className="month-card"
                        onClick={() => onMonthClick(index + 1)} // Pass the month index (1-based) to the parent
                    >
                        {month}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YearView;
