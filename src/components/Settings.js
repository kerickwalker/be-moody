import React, { useState, useEffect } from 'react';

const Settings = () => {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [emotionColors, setEmotionColors] = useState(
        JSON.parse(localStorage.getItem("emotionColors")) || {}
    );
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [newEmotion, setNewEmotion] = useState('');
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        // Save the emotion colors to localStorage whenever it changes
        localStorage.setItem("emotionColors", JSON.stringify(emotionColors));
    }, [emotionColors]);

    const handleBackClick = () => {
        setIsSettingsVisible(false);
    };

    const handleLogout = () => {
        alert("Logged out successfully!");
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

    const handleOpenSettings = () => {
        setIsSettingsVisible(true);
    };

    return (
        <div>
            <button onClick={handleOpenSettings} id="openSettings">
                Open Settings
            </button>

            {isSettingsVisible && (
                <div id="settingsPage">
                    <div className="settings-header">
                        <button onClick={handleBackClick} className="back-button">←</button>
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
                            <option value="sad">Sad</option>
                            <option value="happy">Happy</option>
                            <option value="mad">Mad</option>
                            <option value="addEmotion">+ Add Emotion</option>
                        </select>
                        {selectedEmotion === 'addEmotion' && (
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
            )}
        </div>
    );
};

export default Settings;
