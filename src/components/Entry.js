import React, { useState } from "react";

const Entry = () => {
  const [entryText, setEntryText] = useState("");
  const [embeddedMusic, setEmbeddedMusic] = useState(null);
  const [attachedImages, setAttachedImages] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString());

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
    const journalEntry = {
      date,
      text: entryText,
      music: embeddedMusic,
      images: attachedImages,
    };

    console.log("Saved Journal Entry:", journalEntry);
    alert("Journal entry saved!");
    // You can replace this with actual saving logic (e.g., API call)
  };

  const Entry = ({ navigateToHome }) => {
    return (
        <div>
            <button onClick={navigateToHome}>Back to Home</button>
            <h1>Journal Entry Page</h1>
            {/* Add your journal entry content here */}
        </div>
    );
};

  return (
    <div style={styles.container}>
      <h1 style={styles.date}>{date}</h1>
      <textarea
        style={styles.textArea}
        value={entryText}
        onChange={handleTextChange}
        placeholder="Write your journal entry here..."
      />
      <div style={styles.buttons}>
        <button onClick={handleEmbedMusic} style={styles.button}>
          Embed Music
        </button>
        <label style={styles.button}>
          Attach Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAttachImage}
            style={styles.fileInput}
          />
        </label>
        <button onClick={handleSave} style={styles.doneButton}>
          Done
        </button>
      </div>
      <div style={styles.preview}>
        {embeddedMusic && (
          <iframe
            title="Embedded Music"
            src={embeddedMusic}
            style={styles.musicPlayer}
          ></iframe>
        )}
        {attachedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Attachment ${index + 1}`}
            style={styles.image}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  date: {
    textAlign: "center",
    marginBottom: "20px",
  },
  textArea: {
    width: "100%",
    height: "200px",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  doneButton: {
    padding: "10px 15px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  fileInput: {
    display: "none",
  },
  preview: {
    marginTop: "20px",
  },
  musicPlayer: {
    width: "100%",
    height: "80px",
    marginBottom: "10px",
  },
  image: {
    width: "100px",
    height: "100px",
    marginRight: "10px",
    borderRadius: "5px",
    objectFit: "cover",
  },
};

export default Entry;
