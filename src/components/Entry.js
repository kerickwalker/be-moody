import React, { useState, useEffect } from "react";
import SpotifyEmbed from "./SpotifyEmbed";
import "../styles/Entry.css";

const Entry = ({ navigateToHome, selectedDate, moodColor }) => {
    const [entryText, setEntryText] = useState("");
    const [spotifyLink, setSpotifyLink] = useState("");
    const [attachedImages, setAttachedImages] = useState([]);
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        if (selectedDate) {
            const [month, day, year] = selectedDate.split("/").map(Number);
            const date = new Date(year, month - 1, day);
            const options = { month: "long", day: "numeric", year: "numeric" };
            setFormattedDate(date.toLocaleDateString(undefined, options));

            const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
            const existingEntry = storedEntries.find((entry) => entry.date === selectedDate);

            if (existingEntry) {
                setEntryText(existingEntry.text || "");
                setSpotifyLink(existingEntry.spotifyLink || "");
                setAttachedImages(existingEntry.images || []);
            }
        }
    }, [selectedDate]);

    const handleTextChange = (e) => setEntryText(e.target.value);

    const handleAttachImage = (e) => {
        const files = Array.from(e.target.files);

        Promise.all(
            files.map((file) =>
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                })
            )
        ).then((images) => setAttachedImages((prevImages) => [...prevImages, ...images]));
    };

    const handleRemoveImage = (index) => {
        setAttachedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSpotifyLinkChange = (e) => setSpotifyLink(e.target.value);

    const handleSaveEntry = () => {
        const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        const existingEntry = storedEntries.find((entry) => entry.date === selectedDate);

        const journalEntry = {
            ...existingEntry,
            date: selectedDate,
            text: entryText,
            spotifyLink,
            images: attachedImages, // Save base64 strings
        };

        const updatedEntries = storedEntries.filter((entry) => entry.date !== selectedDate);
        updatedEntries.push(journalEntry);

        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

        alert("Journal entry saved!");
        navigateToHome();
    };

    return (
        <div className="entry-container" style={{ backgroundColor: moodColor || "white" }}>
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

            <div className="entry-section">
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
                <div className="entry-images">
                    {attachedImages.map((image, index) => (
                        <div className="image-wrapper" key={index}>
                            <img
                                src={image}
                                alt={`Attachment ${index + 1}`}
                                className="entry-image"
                            />
                            <button
                                className="remove-image-button"
                                onClick={() => handleRemoveImage(index)}
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="entry-section">
                <input
                    type="text"
                    value={spotifyLink}
                    onChange={handleSpotifyLinkChange}
                    placeholder="Paste Spotify link here..."
                    className="spotify-input"
                />
                {spotifyLink && <SpotifyEmbed link={spotifyLink} />}
            </div>

            <button
                onClick={handleSaveEntry}
                className="entry-save-button"
                disabled={!entryText.trim()}
            >
                Save Entry
            </button>
        </div>
    );
};

export default Entry;
