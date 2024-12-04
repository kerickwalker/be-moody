import React, { useState, useEffect } from "react";
import SpotifyEmbed from "./SpotifyEmbed";
import "../styles/Entry.css";

const Entry = ({ navigateToHome, selectedDate, moodColor }) => {
    const [entryText, setEntryText] = useState("");
    const [spotifyLink, setSpotifyLink] = useState("");
    const [attachedImages, setAttachedImages] = useState([]);
    const [formattedDate, setFormattedDate] = useState("");

    // Format the selectedDate into a readable format
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

    const handleRemoveImage = (index) => {
        setAttachedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSpotifyLinkChange = (e) => {
        setSpotifyLink(e.target.value);
    };

    const handleSaveEntry = () => {
        const journalEntry = {
            date: selectedDate,
            text: entryText,
            spotifyLink,
            images: attachedImages,
        };

        console.log("Saved Journal Entry:", journalEntry);
        alert("Journal entry saved!");
        navigateToHome();
    };

    return (
        <div
            className="entry-container"
            style={{ backgroundColor: moodColor || "white" }}
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

            {/* Attach Images Section */}
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
                                src={URL.createObjectURL(image)}
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

            {/* Embed Spotify Link Section */}
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

            {/* Save Entry Button */}
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
