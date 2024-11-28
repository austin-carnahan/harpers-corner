/**
 * Function to fetch "Today in History" events from Wikipedia.
 * This uses the Fetch API to make a request to Wikipedia's API and retrieves data for the current day.
 *
 * Resources:
 * - Wikipedia API: https://www.mediawiki.org/wiki/API:Main_page
 * - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * - JSON in JavaScript: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
 * - Regex (Regular Expressions): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 */
async function fetchTodayInHistory() {
    // Get today's date and format it into a string like "November 27"
    const today = new Date();
    const month = today.toLocaleString("default", { month: "long" });
    const day = today.getDate();
    const dayQuery = `${month} ${day}`; // e.g., "November 27"

    // Wikipedia API endpoint with parameters for fetching the plain text extract for the day
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(dayQuery)}&prop=extracts&explaintext&origin=*`;

    try {
        // Fetch the data from the Wikipedia API
        const response = await fetch(apiUrl);

        // Check if the response was successful
        if (!response.ok) {
            throw new Error("Failed to fetch Wikipedia data");
        }

        /**
         * Parse the JSON response:
         * Wikipedia's API returns a JSON object containing various metadata and page content.
         * The `response.json()` method converts the raw JSON string into a JavaScript object for easy manipulation.
         * 
         * Resources:
         * - Understanding JSON: https://www.json.org/json-en.html
         */
        const data = await response.json();
        const pageKey = Object.keys(data.query.pages)[0]; // Dynamically get the page ID

        // console.log("Wikipedia page key:", pageKey); // Debug: Log the key for the page
        const pageContent = data.query.pages[pageKey]?.extract; // Get the main content (extract) of the page

        // console.log("Wikipedia page content:", pageContent); // Debug: Log the page content

        // If no content was found, display an error message
        if (!pageContent) {
            console.log("No page content found.");
            displayEvent("No events found", "Try refreshing or checking back later.");
            return;
        }

        // Extract the "Events" section from the page content using regex
        const events = extractEventsFromContent(pageContent);

        // If no events were extracted, display an error message
        if (events.length === 0) {
            displayEvent("No events found", "Try refreshing or checking back later.");
            return;
        }

        // Randomly select an event and display it
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        displayEvent(randomEvent.year, randomEvent.event);

    } catch (error) {
        // Log errors to the console and notify the user
        console.error("Error fetching Today in History events:", error);
        displayEvent("Error", "Unable to fetch events at the moment.");
    }
}

/**
 * Function to extract "Events" from the Wikipedia page content.
 * It identifies the "Events" section and extracts individual events with their year and description.
 * 
 * What is regex and why are we using it here?
 * - Regex (short for Regular Expressions) is a sequence of characters that defines a search pattern.
 * - It is used to match, search, and extract specific parts of a string.
 * - In this script, regex helps us identify and isolate the "Events" section of the Wikipedia page content
 *   and ignore other sections like "Births" or "Deaths."
 * 
 * Resources:
 * - Regex in JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 * - Regex Cheatsheet: https://regexr.com/
 */
function extractEventsFromContent(content) {
    console.log("Extracting Wikipedia events...");

    // Regex to match the "Events" section and capture its content up to "== Births =="
    // The regex pattern:
    // - `== Events ==` matches the "Events" section header.
    // - `([\s\S]*?)` captures all characters (including newlines) following the header up to:
    // - `(?== Births ==|$)` the "== Births ==" header or the end of the content.
    const eventsMatch = content.match(/== Events ==([\s\S]*?)(?== Births ==|$)/);

    if (!eventsMatch) {
        console.log("No events section found.");
        return [];
    }

    const eventsText = eventsMatch[1]; // Extract the text within the "Events" section
    const lines = eventsText.split("\n").filter(line => line.trim() !== ""); // Split into lines and remove empty lines
    const events = [];

    // Loop through each line and extract the year and event description
    lines.forEach(line => {
        // Regex pattern explanation:
        // - `^(\d{1,4})`: Matches the year at the start of the line (1 to 4 digits).
        // - `\s+–\s+`: Matches a dash surrounded by spaces.
        // - `(.+)`: Captures the event description.
        const match = line.match(/^(\d{1,4})\s+–\s+(.+)/);
        if (match) {
            const year = match[1]; // Extract the year
            const event = match[2].replace(/\[.*?\]/g, ""); // Remove references and brackets
            events.push({ year, event });
        }
    });

    // console.log("Extracted events:", events); // Debug: Log the extracted events
    return events;
}

/**
 * Function to display an event on the webpage.
 * It updates the DOM with the event's year, today's date, and description.
 * 
 * @param {string} year - The year of the event
 * @param {string} event - The description of the event
 */
function displayEvent(year, event) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("default", { month: "long", day: "numeric" }); // e.g., "November 27"

    // Update the event title with today's date and the event year
    document.getElementById("event-title").textContent = `Today: ${formattedDate} - Year: ${year}`;

    // Update the event summary with the event description
    document.getElementById("event-summary").textContent = event;
}

/**
 * Event Listener for the "Fetch New Event" button.
 * When the button is clicked, it triggers the `fetchTodayInHistory` function to fetch a new event.
 * 
 * Resources:
 * - Event Handlers in JavaScript: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
 */
document.getElementById("refresh-history").addEventListener("click", fetchTodayInHistory);

/**
 * Fetch the initial "Today in History" event when the page loads.
 * This ensures the user sees an event immediately upon visiting the page.
 */
fetchTodayInHistory();
