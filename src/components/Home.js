import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const Home = ({ selectedMonth, onToggleView, navigateToEntry, navigateToSettings }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moodMap, setMoodMap] = useState({});
    const [selectedMood, setSelectedMood] = useState(null);
    const [journalEntries, setJournalEntries] = useState([]);

    const daysInMonth = new Date(2024, selectedMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(2024, selectedMonth, 1).getDay();

    const calendarDays = [
        ...Array(firstDayOfWeek).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    useEffect(() => {
        // Load journal entries from localStorage
        const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        setJournalEntries(storedEntries);

        // Populate moodMap with keys including both month and day
        const moodData = storedEntries.reduce((acc, entry) => {
            if (entry.date && entry.mood) {
                const [month, day] = entry.date.split('/').map(Number); // MM/DD/YYYY format
                if (!acc[month]) acc[month] = {}; // Initialize month if not present
                acc[month][day] = entry.mood; // Store mood for specific day
            }
            return acc;
        }, {});

        setMoodMap(moodData);
    }, [selectedMonth]);

    const openMoodSelector = (date) => {
        setSelectedDate(date); // Set the selected date
        setIsModalOpen(true); // Open the modal
    };

    const closeMoodSelector = () => {
        setIsModalOpen(false); // Close the modal
    };

    const setMood = (mood) => {
        setSelectedMood(mood); // Just set the mood without closing the modal
    };

    const logEntry = () => {
        // Check if a valid mood and date are selected
        if (selectedMood && selectedDate !== null) {
            console.log(`Navigating to entry for date: ${selectedDate}`); // Debug log
    
            // Format the date string properly if needed, for example "MM/DD/YYYY"
            const formattedDate = `${selectedMonth + 1}/${selectedDate}/2024`;
    
            // Navigate to the entry page with the formatted date
            navigateToEntry(formattedDate); 
        }
    };
    

    const saveAndClose = () => {
        // Save the selected mood for the selected date
        if (selectedDate && selectedMood) {
            const dateStr = `${selectedMonth + 1}/${selectedDate}/2024`; // MM/DD/YYYY format
            const updatedEntries = [...journalEntries];
            const existingEntryIndex = updatedEntries.findIndex((entry) => entry.date === dateStr);

            if (existingEntryIndex !== -1) {
                updatedEntries[existingEntryIndex].mood = selectedMood;
            } else {
                updatedEntries.push({ date: dateStr, mood: selectedMood });
            }

            setJournalEntries(updatedEntries);
            localStorage.setItem('journalEntries', JSON.stringify(updatedEntries)); // Save to localStorage
        }

        closeMoodSelector(); // Close the modal when saving
    };

    return (
        <div>
            <div className="header">
                <div className="view-toggle">
                    <button
                        className={`toggle-button active`}
                        onClick={() => onToggleView('year')}
                    >
                        Yearly View
                    </button>
                </div>
                <h2>{`Month: ${selectedMonth + 1}`}</h2>
            </div>

            <div className="calendar">
                <div className="day">S</div>
                <div className="day">M</div>
                <div className="day">T</div>
                <div className="day">W</div>
                <div className="day">T</div>
                <div className="day">F</div>
                <div className="day">S</div>

                {calendarDays.map((day, index) => {
                    const moodClass = day && moodMap[selectedMonth + 1]?.[day]
                        ? `mood-${moodMap[selectedMonth + 1][day]}`
                        : '';
                    return (
                        <div
                            key={index}
                            className={`date ${moodClass} ${day ? '' : 'empty'}`}
                            onClick={day ? () => openMoodSelector(day) : undefined}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div id="moodModal" className="modal" onClick={closeMoodSelector}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Select a Mood</h3>
                        <ul>
                            <li onClick={() => setMood('happy')}>
                                <span className="mood-color-box mood-happy"></span> Happy
                            </li>
                            <li onClick={() => setMood('sad')}>
                                <span className="mood-color-box mood-sad"></span> Sad
                            </li>
                            <li onClick={() => setMood('nostalgic')}>
                                <span className="mood-color-box mood-nostalgic"></span> Nostalgic
                            </li>
                            <li onClick={() => setMood('frustrated')}>
                                <span className="mood-color-box mood-frustrated"></span> Frustrated
                            </li>
                            <li onClick={() => setMood('anxious')}>
                                <span className="mood-color-box mood-anxious"></span> Anxious
                            </li>
                            <li onClick={() => setMood('angry')}>
                                <span className="mood-color-box mood-angry"></span> Angry
                            </li>
                        </ul>
                        <button
                            className="log-entry-button"
                            onClick={logEntry}
                            disabled={!selectedMood}
                        >
                            <span className="log-entry-icon">📖</span> Log a journal entry
                        </button>
                        <button className="save-close-button" onClick={saveAndClose}>
                            Save and Close
                        </button>
                    </div>
                </div>
            )}

            <button className="settings-icon" onClick={navigateToSettings}>
                ⚙️
            </button>
        </div>
    );
};

export default Home;
