import React, { useState, useEffect } from "react";
import SpotifyEmbed from "./SpotifyEmbed"; // Adjust the path if needed
import "../styles/Entry.css";

const Entry = ({ navigateToHome, selectedDate, moodColor }) => {
    const [entryText, setEntryText] = useState("");
    const [attachedImages, setAttachedImages] = useState([]);
    const [formattedDate, setFormattedDate] = useState("");

    // Format the selectedDate into a more readable format
    useEffect(() => {
        if (selectedDate) {
            const [month, day, year] = selectedDate.split("/").map(Number);
            const date = new Date(year, month - 1, day);
            const options = { month: "long", day: "numeric", year: "numeric" };
            setFormattedDate(date.toLocaleDateString(undefined, options));
        }
    }, [selectedDate]);

    const handleTextChange = (e) => {
        setEntryText(e.target.value);
    };

    const handleAttachImage = (e) => {
        const files = Array.from(e.target.files);
        setAttachedImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSave = () => {
        const journalEntry = {
            date: selectedDate,
            text: entryText,
            images: attachedImages,
        };

        console.log("Saved Journal Entry:", journalEntry);
        alert("Journal entry saved!");
        navigateToHome();
    };

    return (
        <div
            className="entry-container"
            style={{ backgroundColor: moodColor || "white" }} // Default to white if no mood color
        >
            <button onClick={navigateToHome} className="entry-back-button">
                ⬅ Back to Home
            </button>

            <h1 className="entry-date">{formattedDate || "No Date Selected"}</h1>
            <textarea
                className="entry-text-area"
                value={entryText}
                onChange={handleTextChange}
                placeholder="Write your journal entry here..."
            />
            <div className="entry-buttons">
                <label className="entry-button">
                    Attach Images
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAttachImage}
                        className="entry-file-input"
                    />
                </label>
                <button
                    onClick={handleSave}
                    className="entry-done-button"
                    disabled={!entryText.trim()}
                >
                    Done
                </button>
            </div>
            <div className="entry-preview">
                <SpotifyEmbed /> {/* Integrate SpotifyEmbed */}
                {attachedImages.map((image, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Attachment ${index + 1}`}
                        className="entry-image"
                    />
                ))}
            </div>
        </div>
    );
};

export default Entry;
