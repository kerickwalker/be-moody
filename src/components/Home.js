import React, { useState } from 'react';
import '../styles/Home.css';
import { useNavigate } from "react-router-dom";

const Home = ({ selectedMonth, onToggleView }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moodMap, setMoodMap] = useState({});
    const navigate = useNavigate();
    const [selectedMood, setSelectedMood] = useState(null);

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
            setMoodMap((prev) => ({
                ...prev,
                [selectedDate]: mood,
            }));
        }
        closeMoodSelector();
    };

    const logEntry = () => {
        // navigate("./components/Entry"); // Navigate to Entry page
        // window.location.href = "src/components/Entry.js"; // This opens the /entry page.
        alert('Log a journal entry (functionality not implemented)');
    };

    return (
        <div>
            <div className="header">
                {/* Yearly View Toggle Button */}
                <div className="view-toggle">
                    <button
                        className={`toggle-button active`}
                        onClick={() => onToggleView('year')}
                    >
                        Yearly View
                    </button>
                </div>
                <h2>{`Month: ${selectedMonth || 'Select a month'}`}</h2>
            </div>

            <div className="calendar">
                <div className="day">S</div>
                <div className="day">M</div>
                <div className="day">T</div>
                <div className="day">W</div>
                <div className="day">T</div>
                <div className="day">F</div>
                <div className="day">S</div>

                {[...Array(31).keys()].map((i) => {
                    const date = i + 1;
                    const moodClass = moodMap[date] ? `mood-${moodMap[date]}` : '';
                    return (
                        <div
                            key={date}
                            className={`date ${moodClass}`}
                            onClick={() => openMoodSelector(date)}
                        >
                            {date}
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
                            disabled={!selectedMood} // Only enable if mood is selected
                        >
                            <span className="log-entry-icon">📖</span> Log a journal entry
                        </button>
                    </div>
                </div>
            )}
            {/* Settings Icon */}
            <button className="settings-icon" onClick={goToSettings}>
                ⚙️
            </button>
        </div>
    );
};

export default Home;
