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

        // Populate moodMap based on stored entries
        const moodData = storedEntries.reduce((acc, entry) => {
            if (entry.date && entry.mood) {
                acc[parseInt(entry.date.split('/')[1])] = entry.mood; // Assuming MM/DD/YYYY format
            }
            return acc;
        }, {});

        setMoodMap(moodData);
    }, [selectedMonth]);

    const openMoodSelector = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const closeMoodSelector = () => {
        setIsModalOpen(false);
    };

    const setMood = (mood) => {
        setSelectedMood(mood);

        if (selectedDate !== null) {
            // Update moodMap
            setMoodMap((prev) => ({
                ...prev,
                [selectedDate]: mood,
            }));

            // Update or add journal entry
            const dateStr = `${selectedMonth + 1}/${selectedDate}/2024`; // Assuming MM/DD/YYYY format
            const updatedEntries = [...journalEntries];
            const existingEntryIndex = updatedEntries.findIndex((entry) => entry.date === dateStr);

            if (existingEntryIndex !== -1) {
                updatedEntries[existingEntryIndex].mood = mood; // Update mood if entry exists
            } else {
                updatedEntries.push({ date: dateStr, mood }); // Add new entry if not found
            }

            setJournalEntries(updatedEntries);
            localStorage.setItem('journalEntries', JSON.stringify(updatedEntries)); // Save to localStorage
        }

        closeMoodSelector();
    };

    const logEntry = () => {
        navigateToEntry();
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
                    const moodClass = day && moodMap[day] ? `mood-${moodMap[day]}` : '';
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
