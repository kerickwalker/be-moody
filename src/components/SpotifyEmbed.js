import React from "react";

const SpotifyEmbed = ({ link }) => {
    // Extract the Spotify track/playlist/album ID
    const getEmbedUrl = (url) => {
        try {
            const spotifyUrlPattern =
                /https:\/\/open\.spotify\.com\/(track|album|playlist)\/([a-zA-Z0-9]+)/;
            const match = url.match(spotifyUrlPattern);

            if (match) {
                const [_, type, id] = match;
                return `https://open.spotify.com/embed/${type}/${id}`;
            }
        } catch (err) {
            console.error("Invalid Spotify URL:", err);
        }
        return null;
    };

    const embedUrl = getEmbedUrl(link);

    if (!embedUrl) {
        return <p style={{ color: "red" }}>Invalid Spotify link. Please try again!</p>;
    }

    return (
        <iframe
            title="Spotify Embed"
            src={embedUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            style={{ borderRadius: "10px", marginTop: "10px" }}
        ></iframe>
    );
};

export default SpotifyEmbed;
