import React, { useState, useEffect } from "react";

const Entry = ({ navigateToHome }) => {
  const [entryText, setEntryText] = useState("");
  const [embeddedMusic, setEmbeddedMusic] = useState(null);
  const [attachedImages, setAttachedImages] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [entries, setEntries] = useState([]);

  // Load entries from localStorage on component mount
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(storedEntries);
  }, []);

  const handleTextChange = (e) => {
    setEntryText(e.target.value);
  };

  const handleSave = () => {
    const journalEntry = {
      date,
      text: entryText,
      music: embeddedMusic,
      images: attachedImages.map((image) => image.name),
    };

    // Save new entry in state
    const updatedEntries = [...entries, journalEntry];
    setEntries(updatedEntries);

    // Save updated entries to localStorage
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

    alert("Journal entry saved!");
    navigateToHome();
  };

  return (
    <div>
      <h1>{date}</h1>
      <textarea
        value={entryText}
        onChange={handleTextChange}
        placeholder="Write your journal entry here..."
      />
      <button onClick={handleSave}>Save Entry</button>
    </div>
  );
};

export default Entry;
