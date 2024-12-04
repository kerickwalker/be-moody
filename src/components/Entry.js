import React, { useState, useEffect } from "react";
import "../styles/Entry.css";

const Entry = ({ navigateToHome, selectedDate }) => {
    const [entryText, setEntryText] = useState("");
    const [embeddedMusic, setEmbeddedMusic] = useState(null);
    const [attachedImages, setAttachedImages] = useState([]);
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        if (selectedDate) {
            const [month, day, year] = selectedDate.split("/").map(Number);
            const date = new Date(year, month - 1, day);
            const options = { month: "long", day: "numeric", year: "numeric" };
            setFormattedDate(date.toLocaleDateString(undefined, options));

            // Load existing journal entry from localStorage
            const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
            const existingEntry = storedEntries.find((entry) => entry.date === selectedDate);
            
            if (existingEntry) {
                setEntryText(existingEntry.text || "");
                setEmbeddedMusic(existingEntry.music || null);
                setAttachedImages((existingEntry.images || []).map((file) => new File([], file.name)));
            }
        }
    }, [selectedDate]);

    const handleTextChange = (e) => {
        setEntryText(e.target.value);
    };

    const handleAttachImage = (e) => {
        const files = Array.from(e.target.files);
        setAttachedImages((prevImages) => [...prevImages, ...files]);
    };

    const handleEmbedMusic = () => {
        const musicUrl = prompt("Enter the URL of the music you want to embed:");
        if (musicUrl) {
            setEmbeddedMusic(musicUrl);
        }
    };

    const handleSave = () => {
        const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        const existingEntry = storedEntries.find((entry) => entry.date === selectedDate);
    
        // Merge new data with existing metadata (like color)
        const journalEntry = {
            ...existingEntry, // Keep any existing data, such as color
            date: selectedDate,
            text: entryText,
            music: embeddedMusic,
            images: attachedImages.map((image) => ({
                name: image.name,
            })),
        };
    
        const updatedEntries = storedEntries.filter((entry) => entry.date !== selectedDate);
        updatedEntries.push(journalEntry);
    
        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    
        console.log("Saved Journal Entry:", journalEntry);
        alert("Journal entry saved!");
        navigateToHome();
    };
    

    return (
        <div className="entry-container">
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
                <button onClick={handleEmbedMusic} className="entry-button">
                    Embed Music
                </button>
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
                {embeddedMusic && (
                    <iframe
                        title="Embedded Music"
                        src={embeddedMusic}
                        className="entry-music-player"
                    ></iframe>
                )}
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
