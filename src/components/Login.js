import React, { useState } from "react";
import "../styles/Login.css";

const Login = ({ navigateToHome }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleNext = () => {
        if (username && password) {
            navigateToHome(); // Navigate to the Home page
        } else {
            alert("Please enter your username and password.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-background"></div>
            <div className="login-content">
                <img 
                    src="/logo.png" // Replace with the path to your logo
                    alt="App Logo"
                    className="logo"
                />
                <h2>Welcome to BeMoody</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleNext} className="next-button">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Login;
