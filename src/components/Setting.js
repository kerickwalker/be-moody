document.getElementById("openSettings").addEventListener("click", function () {
    const settingsPage = document.getElementById("settingsPage");

    // Create settings page content dynamically
    settingsPage.innerHTML = `
        <div class="settings-header">
            <button id="backButton" class="back-button">←</button>
            <h2>Settings</h2>
        </div>
        <div class="settings-content">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" id="nameField">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" id="emailField">
            <label>Birthday</label>
            <input type="date" id="birthdayField">
            <label>Emotion Color Settings</label>
            <select id="emotionColorSettings">
                <option value="sad">Sad</option>
                <option value="happy">Happy</option>
                <option value="mad">Mad</option>
                <option value="addEmotion">+ Add Emotion</option>
            </select>
            <div id="colorPickerContainer" class="hidden">
                <label>Pick a Color for the Emotion</label>
                <input type="color" id="colorPicker">
                <button id="saveColor">Save Color</button>
            </div>
        </div>
        <button id="logoutButton" class="logout-button">Logout</button>
    `;

    // Show the settings page
    settingsPage.classList.remove("hidden");

    // Back button functionality
    document.getElementById("backButton").addEventListener("click", function () {
        settingsPage.classList.add("hidden");
    });

    // Logout button functionality
    document.getElementById("logoutButton").addEventListener("click", function () {
        alert("Logged out successfully!");
    });

    // Emotion color picker functionality
    document.getElementById("emotionColorSettings").addEventListener("change", function (event) {
        const selectedValue = event.target.value;
        const colorPickerContainer = document.getElementById("colorPickerContainer");

        if (selectedValue === "addEmotion") {
            const newEmotion = prompt("Enter new emotion:");
            if (newEmotion) {
                const newOption = document.createElement("option");
                newOption.value = newEmotion.toLowerCase();
                newOption.textContent = newEmotion;
                this.appendChild(newOption);
                this.value = newEmotion.toLowerCase();
                colorPickerContainer.classList.remove("hidden");
            }
        } else {
            colorPickerContainer.classList.add("hidden");
        }
    });

    // Save the chosen color for the new emotion
    document.getElementById("saveColor").addEventListener("click", function () {
        const emotionColorSettings = document.getElementById("emotionColorSettings");
        const selectedEmotion = emotionColorSettings.value;
        const chosenColor = document.getElementById("colorPicker").value;

        if (selectedEmotion && chosenColor) {
            // Save the color setting (could use localStorage or any other method)
            const emotionColors = JSON.parse(localStorage.getItem("emotionColors") || "{}");
            emotionColors[selectedEmotion] = chosenColor;
            localStorage.setItem("emotionColors", JSON.stringify(emotionColors));

            alert(`Color for ${selectedEmotion} saved as ${chosenColor}!`);
            document.getElementById("colorPickerContainer").classList.add("hidden");
        }
    });
});

// Retrieve and apply the saved colors on the home page
document.addEventListener("DOMContentLoaded", function () {
    const emotionColors = JSON.parse(localStorage.getItem("emotionColors") || "{}");

    for (const [emotion, color] of Object.entries(emotionColors)) {
        console.log(`Emotion: ${emotion}, Color: ${color}`); // Replace this with your logic for applying the colors to the home page
    }
});


