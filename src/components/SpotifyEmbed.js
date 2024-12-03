import React, { useState } from "react";

const SpotifyEmbed = () => {
    const [spotifyUrl, setSpotifyUrl] = useState("");
    const [embedUrl, setEmbedUrl] = useState("");

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setSpotifyUrl(url);

        // Extract the Spotify embed URL
        if (url.startsWith("https://open.spotify.com/")) {
            const embedUrl = url.replace("https://open.spotify.com/", "https://open.spotify.com/embed/");
            setEmbedUrl(embedUrl);
        } else {
            setEmbedUrl(""); // Clear embed URL if invalid
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Paste Spotify song or playlist link here"
                value={spotifyUrl}
                onChange={handleUrlChange}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            {embedUrl ? (
                <iframe
                    src={embedUrl}
                    width="300"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                    allowTransparency="true"
                    title="Spotify Player"
                ></iframe>
            ) : (
                spotifyUrl && <p style={{ color: "red" }}>Invalid Spotify URL</p>
            )}
        </div>
    );
};

export default SpotifyEmbed;
