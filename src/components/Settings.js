import React, { useState, useEffect } from 'react';
import '../styles/Settings.css';

const Settings = ({ navigateToHome }) => {
    const [emotionColors, setEmotionColors] = useState(
        JSON.parse(localStorage.getItem("emotionColors")) || {}
    );
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        // Save emotion colors to localStorage whenever they change
        localStorage.setItem("emotionColors", JSON.stringify(emotionColors));
    }, [emotionColors]);

    const handleLogout = () => {
        alert("Logged out successfully!");
        navigateToHome(); // Redirect to Home or Login page after logout
    };

    const handleEmotionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedEmotion(selectedValue);

        if (selectedValue === 'addEmotion') {
            const newEmotion = prompt("Enter new emotion:");
            if (newEmotion) {
                const newEmotionValue = newEmotion.toLowerCase();
                setEmotionColors((prevColors) => ({
                    ...prevColors,
                    [newEmotionValue]: '#000000', // Default color for new emotion
                }));
                setSelectedEmotion(newEmotionValue);
            }
        }
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleSaveColor = () => {
        if (selectedEmotion && color) {
            setEmotionColors((prevColors) => ({
                ...prevColors,
                [selectedEmotion]: color,
            }));
            alert(`Color for ${selectedEmotion} saved as ${color}!`);
        }
    };

    return (
        <div id="settingsPage">
            <div className="settings-header">
                <button onClick={navigateToHome} className="back-button">←</button>
                <h2>Settings</h2>
            </div>
            <div className="settings-content">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" id="nameField" />
                <label>Email</label>
                <input type="email" placeholder="Enter your email" id="emailField" />
                <label>Birthday</label>
                <input type="date" id="birthdayField" />
                <label>Emotion Color Settings</label>
                <select
                    id="emotionColorSettings"
                    value={selectedEmotion}
                    onChange={handleEmotionChange}
                >
                    <option value="">Select Emotion</option>
                    {Object.keys(emotionColors).map((emotion) => (
                        <option key={emotion} value={emotion}>
                            {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                        </option>
                    ))}
                    <option value="addEmotion">+ Add Emotion</option>
                </select>
                {selectedEmotion && (
                    <div id="colorPickerContainer">
                        <label>Pick a Color for the Emotion</label>
                        <input type="color" id="colorPicker" value={color} onChange={handleColorChange} />
                        <button id="saveColor" onClick={handleSaveColor}>
                            Save Color
                        </button>
                    </div>
                )}
            </div>
            <button onClick={handleLogout} id="logoutButton" className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default Settings;