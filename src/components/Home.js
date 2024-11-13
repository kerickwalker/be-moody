export default function Home() {
    return (
    <div class="container">
        <div class="view-toggle">
            <button id="monthView" class="toggle-button active">Month</button>
            <button id="yearView" class="toggle-button">Year</button>
        </div>
        <h2>November 6, 2024</h2>
        
        <div class="calendar">
            <div class="day">S</div>
            <div class="day">M</div>
            <div class="day">T</div>
            <div class="day">W</div>
            <div class="day">T</div>
            <div class="day">F</div>
            <div class="day">S</div>

            <div class="date" onclick="openMoodSelector(this)">1</div>
            <div class="date" onclick="openMoodSelector(this)">2</div>
            <div class="date mood-sad" onclick="openMoodSelector(this)">3</div>
            <div class="date mood-sad" onclick="openMoodSelector(this)">4</div>
            <div class="date mood-happy" onclick="openMoodSelector(this)">5</div>
            <div class="date mood-nostalgic" onclick="openMoodSelector(this)">6</div>
            <div class="date" onclick="openMoodSelector(this)">7</div>
            <div class="date" onclick="openMoodSelector(this)">8</div>
            <div class="date" onclick="openMoodSelector(this)">9</div>
            <div class="date" onclick="openMoodSelector(this)">10</div>
            <div class="date" onclick="openMoodSelector(this)">11</div>
            <div class="date" onclick="openMoodSelector(this)">12</div>
            <div class="date" onclick="openMoodSelector(this)">13</div>
            <div class="date" onclick="openMoodSelector(this)">14</div>
            <div class="date" onclick="openMoodSelector(this)">15</div>
            <div class="date" onclick="openMoodSelector(this)">16</div>
            <div class="date" onclick="openMoodSelector(this)">17</div>
            <div class="date" onclick="openMoodSelector(this)">18</div>
            <div class="date" onclick="openMoodSelector(this)">19</div>
            <div class="date" onclick="openMoodSelector(this)">20</div>
            <div class="date" onclick="openMoodSelector(this)">21</div>
            <div class="date" onclick="openMoodSelector(this)">22</div>
            <div class="date" onclick="openMoodSelector(this)">23</div>
            <div class="date" onclick="openMoodSelector(this)">24</div>
            <div class="date" onclick="openMoodSelector(this)">25</div>
            <div class="date" onclick="openMoodSelector(this)">26</div>
            <div class="date" onclick="openMoodSelector(this)">27</div>
            <div class="date" onclick="openMoodSelector(this)">28</div>
            <div class="date" onclick="openMoodSelector(this)">29</div>
            <div class="date" onclick="openMoodSelector(this)">30</div>
        </div>
        
        <div id="moodModal" class="modal">
            <div class="modal-content">
                <h3>Select a Mood</h3>
                <ul>
                    <li onclick="setMood('happy')">Happy</li>
                    <li onclick="setMood('sad')">Sad</li>
                    <li onclick="setMood('nostalgic')">Nostalgic</li>
                    <li onclick="setMood('frustrated')">Frustrated</li>
                    <li onclick="setMood('anxious')">Anxious</li>
                    <li onclick="setMood('angry')">Angry</li>
                </ul>
                <button onclick="logEntry()">Log a journal entry</button>
            </div>
        </div>
    </div>


    );
  }