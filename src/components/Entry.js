import React, { useState, useEffect, useRef } from "react";
import SpotifyEmbed from "./SpotifyEmbed";
import "../styles/Entry.css";

const Entry = ({ navigateToHome, selectedDate, moodColor }) => {
    const [entryText, setEntryText] = useState("");
    const [attachedImages, setAttachedImages] = useState([]);
    const [spotifyLink, setSpotifyLink] = useState("");
    const [formattedDate, setFormattedDate] = useState("");
    const [showSpotifyEmbed, setShowSpotifyEmbed] = useState(false);
    const fileInputRef = useRef(null); // Ref for hidden file input

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
                if (existingEntry.spotifyLink) {
                    setShowSpotifyEmbed(true); // Show embed if a Spotify link is saved
                }
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
            images: attachedImages,
        };

        const updatedEntries = storedEntries.filter((entry) => entry.date !== selectedDate);
        updatedEntries.push(journalEntry);

        localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

        alert("Journal entry saved!");
        navigateToHome();
    };

    const triggerFileInput = () => {
        fileInputRef.current.click(); // Trigger hidden file input
    };

    return (
        <div className="entry-container" style={{ backgroundColor: moodColor || "white" }}>
            <button onClick={navigateToHome} className="entry-back-button">
                ⬅ Exit Without Saving
            </button>

            <h1 className="entry-date">{formattedDate || "No Date Selected"}</h1>
            <textarea
                className="entry-text-area"
                value={entryText}
                onChange={handleTextChange}
                placeholder="Write your journal entry here..."
            />

            <div className="entry-section">
                <button onClick={triggerFileInput} className="attach-image-button">
                    Attach Images
                </button>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }} // Hide the file input
                    onChange={handleAttachImage}
                />
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
                {!showSpotifyEmbed && (
                    <button
                        onClick={() => setShowSpotifyEmbed(true)}
                        className="embed-music-button"
                    >
                        Embed Music
                    </button>
                )}
                {showSpotifyEmbed && (
                    <div>
                        <input
                            type="text"
                            value={spotifyLink}
                            onChange={handleSpotifyLinkChange}
                            placeholder="Paste Spotify link here..."
                            className="spotify-link-input"
                        />
                        <SpotifyEmbed link={spotifyLink} />
                    </div>
                )}
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
