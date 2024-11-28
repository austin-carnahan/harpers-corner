/**
 * Function to fetch a random dog picture from the Dog API.
 * This uses the `fetch` method to make a request to an external API.
 * 
 * Resources:
 * - APIs: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction
 * - Dog API Documentation: https://dog.ceo/dog-api/
 * - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */
async function fetchRandomDog() {
    // The URL for the Dog API endpoint that returns a random dog image
    const apiUrl = "https://dog.ceo/api/breeds/image/random";

    try {
        // Use the Fetch API to make a GET request to the Dog API
        const response = await fetch(apiUrl);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error("Failed to fetch dog picture");
        }

        /**
         * Parsing the JSON response:
         * The Dog API returns data in JSON (JavaScript Object Notation) format. 
         * JSON is a lightweight data-interchange format that's easy for humans to read and write 
         * and easy for machines to parse and generate. 
         * It often represents data as key-value pairs (like a dictionary or object in JavaScript).
         * 
         * We use `response.json()` to parse the JSON data from the API response into a JavaScript object.
         * Once parsed, we can access the specific properties of the object using their keys.
         * 
         * Resources:
         * - What is JSON?: https://www.json.org/json-en.html
         * - JSON with JavaScript: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
         * - Fetch API and JSON: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
         */
        const data = await response.json(); // Parse the JSON response
        console.log("Dog API response:", data); // Debugging: log the parsed JSON object

        // Update the image element on the webpage with the new dog picture
        const dogImage = document.getElementById("dog-image");
        dogImage.src = data.message; // `message` contains the URL of the dog image
        dogImage.alt = "A random dog picture"; // Update alt text for accessibility

    } catch (error) {
        // Handle any errors that occur during the fetch or JSON parsing
        console.error("Error fetching random dog picture:", error);

        // Provide user feedback in case of an error
        alert("Oops! Something went wrong while fetching the dog picture.");
    }
}

/**
 * Event Listener for the "Fetch New Dog" button.
 * When the button is clicked, it triggers the `fetchRandomDog` function to fetch a new dog picture.
 * 
 * Resources:
 * - Event Listeners: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
document.getElementById("fetch-dog-button").addEventListener("click", fetchRandomDog);

/**
 * Fetch an initial dog picture when the page loads.
 * This ensures there's a dog image displayed by default when the webpage is first opened.
 */
fetchRandomDog();
