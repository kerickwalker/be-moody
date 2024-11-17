import React, { useState } from 'react';
import '../styles/Home.css';

const Home = ({ selectedMonth, onToggleView }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [moodMap, setMoodMap] = useState({});

    const openMoodSelector = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const closeMoodSelector = () => {
        setIsModalOpen(false);
    };

    const setMood = (mood) => {
        if (selectedDate !== null) {
            setMoodMap((prev) => ({
                ...prev,
                [selectedDate]: mood,
            }));
        }
        closeMoodSelector();
    };

    const logEntry = () => {
        alert('Log a journal entry (functionality not implemented)');
    };

    return (
        <div>
            <div className="header">
                <button className="toggle-view-button" onClick={onToggleView}>
                    {`Switch to ${selectedMonth ? 'Yearly' : 'Monthly'} View`}
                </button>
                <h2>{`Month: ${selectedMonth}`}</h2>
            </div>

            <div className="calendar">
                <div className="day">S</div>
                <div className="day">M</div>
                <div className="day">T</div>
                <div className="day">W</div>
                <div className="day">T</div>
                <div className="day">F</div>
                <div className="day">S</div>

                {[...Array(30).keys()].map((i) => {
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
                            <li onClick={() => setMood('happy')}>Happy</li>
                            <li onClick={() => setMood('sad')}>Sad</li>
                            <li onClick={() => setMood('nostalgic')}>Nostalgic</li>
                            <li onClick={() => setMood('frustrated')}>Frustrated</li>
                            <li onClick={() => setMood('anxious')}>Anxious</li>
                            <li onClick={() => setMood('angry')}>Angry</li>
                        </ul>
                        <button onClick={logEntry}>Log a journal entry</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
