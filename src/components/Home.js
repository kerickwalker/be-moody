import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const Home = ({ selectedMonth, onToggleView, navigateToEntry, navigateToSettings }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moodMap, setMoodMap] = useState({});
    const [selectedMood, setSelectedMood] = useState(null);
    const [journalEntries, setJournalEntries] = useState([]);
    const [isMoodEditorOpen, setIsMoodEditorOpen] = useState(false);
    const [customMoods, setCustomMoods] = useState([]); // Store custom moods
    const [newMoodName, setNewMoodName] = useState('');
    const [newMoodColor, setNewMoodColor] = useState('#ffffff'); // Default white color for custom mood

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysInMonth = new Date(2024, selectedMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(2024, selectedMonth, 1).getDay();

    const calendarDays = [
        ...Array(firstDayOfWeek).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    // Get the current date
    const currentDate = new Date();
    const formattedDate = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

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

        const storedMoods = JSON.parse(localStorage.getItem('customMoods')) || [];
        setCustomMoods(storedMoods);
    }, [selectedMonth]);

    const openMoodSelector = (date) => {
        setSelectedDate(date); // Set the selected date
        setIsModalOpen(true);
        setSelectedMood(null); // Reset mood when opening the modal for a new day
    };

    const closeMoodSelector = () => {
        setIsModalOpen(false);
    };

    const setMood = (mood) => {
        setSelectedMood(mood); // Set the selected mood for the specific day
        
        if (selectedDate !== null) {
            setMoodMap((prev) => ({
                ...prev,
                [selectedMonth + 1]: {
                    ...prev[selectedMonth + 1],
                    [selectedDate]: mood,
                },
            }));

            // Update or add journal entry
            const dateStr = `${selectedMonth + 1}/${selectedDate}/2024`; // MM/DD/YYYY format
            const updatedEntries = [...journalEntries];
            const existingEntryIndex = updatedEntries.findIndex((entry) => entry.date === dateStr);

            if (existingEntryIndex !== -1) {
                updatedEntries[existingEntryIndex].mood = mood;
            } else {
                updatedEntries.push({ date: dateStr, mood });
            }

            setJournalEntries(updatedEntries);
            localStorage.setItem('journalEntries', JSON.stringify(updatedEntries)); // Save to localStorage
        }
    };


    const logEntry = () => {
        if (selectedMood) {
            const formattedDate = `${selectedMonth + 1}/${selectedDate}/2024`;
            const moodColor =
                predefinedMoodColors[selectedMood] || 
                customMoods.find((mood) => mood.name === selectedMood)?.color;
    
            navigateToEntry(formattedDate, moodColor); // Include mood color
        }
    };
    
    

    const addCustomMood = () => {
        if (newMoodName && newMoodColor) {
            const newMood = { name: newMoodName, color: newMoodColor };
            const updatedMoods = [...customMoods, newMood];
            setCustomMoods(updatedMoods);
            localStorage.setItem('customMoods', JSON.stringify(updatedMoods));
            setNewMoodName('');
            setNewMoodColor('#ffffff');
            setIsMoodEditorOpen(false); // Close the editor modal
        }
    };

    // Predefined mood colors
    const predefinedMoodColors = {
        happy: '#ffeb3b',
        sad: '#90caf9',
        nostalgic: '#ffcc80',
        frustrated: '#ef9a9a', 
        anxious: '#a5d6a7',
        angry: '#e57373'
    };

    return (
        <div>
            <div className="header">
                <div className="today-date">
                    <h3>Today is: {formattedDate}</h3>
                </div>
                <h2>{months[selectedMonth]}</h2> {/* Display month name */}
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
                    const isToday =
                        day &&
                        selectedMonth === new Date().getMonth() &&
                        day === new Date().getDate();
                    
                    const mood = day && moodMap[selectedMonth + 1]?.[day];

                    // Determine the mood color (either predefined or custom)
                    const moodColor = mood
                        ? predefinedMoodColors[mood] || 
                          customMoods.find((custom) => custom.name === mood)?.color
                        : null;

                    return (
                        <div
                            key={index}
                            className={`date ${isToday ? 'current-day' : ''} ${day ? '' : 'empty'}`}
                            style={{ backgroundColor: moodColor || '' }}
                            onClick={day ? () => openMoodSelector(day) : undefined}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            <div className="view-toggle">
                <button
                    className={`toggle-button active`}
                    onClick={() => onToggleView('year')}
                >
                    Yearly View
                </button>
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
                            {customMoods.map((mood, index) => (
                                <li key={index} onClick={() => setMood(mood.name)}>
                                    <span
                                        className="mood-color-box"
                                        style={{ backgroundColor: mood.color }}
                                    ></span> 
                                    {mood.name}
                                </li>
                            ))}
                            <li>
                                <button onClick={() => setIsMoodEditorOpen(true)} className="add-mood-button">
                                    + Add Mood
                                </button>
                            </li>
                        </ul>
                        <button
                            className="log-entry-button"
                            onClick={logEntry}
                            disabled={!selectedMood || selectedDate === null}
                        >
                            <span className="log-entry-icon">📖</span> Log a journal entry
                        </button>
                        <button className="save-close-button" onClick={closeMoodSelector}>
                            Save and Close
                        </button>
                    </div>
                </div>
            )}

            {isMoodEditorOpen && (
                <div className="modal" onClick={() => setIsMoodEditorOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Create New Mood</h3>
                        <input
                            type="text"
                            placeholder="Mood name"
                            value={newMoodName}
                            onChange={(e) => setNewMoodName(e.target.value)}
                        />
                        <input
                            type="color"
                            value={newMoodColor}
                            onChange={(e) => setNewMoodColor(e.target.value)}
                        />
                        <button onClick={addCustomMood}>Save Mood</button>
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
