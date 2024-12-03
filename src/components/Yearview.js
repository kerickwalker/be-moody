import React, { useEffect, useState } from 'react';
import '../styles/Yearview.css';

const YearView = ({ onMonthClick }) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [moodMap, setMoodMap] = useState({});
    const [customMoods, setCustomMoods] = useState([]); // Store custom moods

    // Predefined mood colors
    const predefinedMoodColors = {
        happy: '#ffeb3b',
        sad: '#90caf9',
        nostalgic: '#ffcc80',
        frustrated: '#ef9a9a', 
        anxious: '#a5d6a7',
        angry: '#e57373'
    };

    useEffect(() => {
        // Load journal entries from localStorage
        const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        
        // Create a moodMap with unique keys for year, month, and day
        const moodData = storedEntries.reduce((acc, entry) => {
            const [month, day, year] = entry.date.split('/').map(Number);

            if (!acc[year]) acc[year] = {}; // Create year key
            if (!acc[year][month - 1]) acc[year][month - 1] = {}; // Create month key
            acc[year][month - 1][day] = entry.mood; // Assign mood to specific day

            return acc;
        }, {});

        setMoodMap(moodData);

        // Load custom moods from localStorage
        const storedMoods = JSON.parse(localStorage.getItem('customMoods')) || [];
        setCustomMoods(storedMoods);
    }, []);

    const generateCalendarDays = (month) => {
        const daysInMonth = new Date(2024, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(2024, month, 1).getDay();

        return [
            ...Array(firstDayOfWeek).fill(null),
            ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ];
    };

    return (
        <div className="year-view">
            <h1>Year View</h1>
            <div className="months-grid">
                {months.map((month, index) => (
                    <div
                        key={index}
                        className="month-card"
                        onClick={() => onMonthClick(index)}
                    >
                        <h3>{month}</h3>
                        <div className="mini-calendar">
                            {generateCalendarDays(index).map((day, dayIndex) => {
                                const mood = day ? moodMap[2024]?.[index]?.[day] : null; // Access mood using year, month, day
                                
                                // Determine the mood color (either predefined or custom)
                                const moodColor = mood
                                    ? predefinedMoodColors[mood] ||
                                      customMoods.find((custom) => custom.name === mood)?.color
                                    : null;

                                return (
                                    <div
                                        key={dayIndex}
                                        className={`mini-calendar-day ${day ? '' : 'empty'}`}
                                        style={{ backgroundColor: moodColor || '' }}
                                    >
                                        {day || ''}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YearView;
