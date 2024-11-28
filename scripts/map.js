/**
 * This script combines two APIs — Google Maps and the USGS Volcanoes API — to create a dynamic map
 * that displays information about volcanoes around the world. Each volcano is represented by a marker,
 * and clicking on the marker reveals detailed information about the volcano.
 * 
 * Resources:
 * - Google Maps API: https://developers.google.com/maps/documentation/javascript/overview
 * - USGS Volcanoes API: https://volcanoes.usgs.gov/vsc/api/volcanoApi
 * - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

let map; // Declare a global variable to store the map instance

/**
 * Function to initialize the Google Map.
 * This function sets up the map and fetches volcano data to display as markers.
 */
async function initMap() {
    // Default map center at latitude 0, longitude 0 (equator/prime meridian intersection)
    const defaultCenter = { lat: 0, lng: 0 };

    // Dynamically import the Google Maps library
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    /**
     * Create a new map instance:
     * - The map is centered at the default location with a world-level zoom.
     * - Replace "DEMO_MAP_ID" with your map ID if you have a custom Google Maps styling setup.
     * 
     * Resources:
     * - Google Maps Initialization: https://developers.google.com/maps/documentation/javascript/overview#Maps
     */
    map = new Map(document.getElementById("map"), {
        zoom: 2, // Zoom level for displaying the whole world
        center: defaultCenter,
        mapId: "DEMO_MAP_ID", // Optional: Replace with your own map ID for styling
    });

    // Fetch and display volcano data as markers on the map
    fetchVolcanoData();
}

/**
 * Function to fetch volcano data from the USGS Volcanoes API.
 * The API provides detailed information about volcanoes worldwide.
 */
function fetchVolcanoData() {
    const apiUrl = "https://volcanoes.usgs.gov/vsc/api/volcanoApi/volcanoesGVP";

    /**
     * Use the Fetch API to make an HTTP request to the volcano API.
     * The Fetch API is a modern way to perform asynchronous HTTP requests.
     * 
     * Resources:
     * - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
     */
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch volcano data"); // Handle network errors
            }
            return response.json(); // Parse the JSON response
        })
        .then((volcanoes) => {
            addVolcanoMarkers(volcanoes); // Pass the data to the marker-adding function
        })
        .catch((error) => {
            console.error("Error fetching volcano data:", error); // Log errors to the console
        });
}

/**
 * Function to add markers to the map for each volcano in the data.
 * Each marker represents a volcano and displays detailed information when clicked.
 * 
 * @param {Array} volcanoes - Array of volcano objects retrieved from the API.
 */
function addVolcanoMarkers(volcanoes) {
    volcanoes.forEach((volcano) => {
        const {
            vName, // Volcano name
            country, // Country where the volcano is located
            subregion, // Subregion of the volcano
            latitude, // Latitude coordinate
            longitude, // Longitude coordinate
            elevation_m, // Elevation in meters
            webpage, // URL for more information
        } = volcano;

        // Check if latitude and longitude exist before adding a marker
        if (latitude && longitude) {
            /**
             * Create a marker on the map for the volcano.
             * 
             * Resources:
             * - Google Maps Markers: https://developers.google.com/maps/documentation/javascript/markers
             */
            const marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: vName, // Set the marker's title to the volcano's name
            });

            /**
             * Create an info window to display volcano details when the marker is clicked.
             * The content includes the volcano's name, country, subregion, elevation, and a link for more information.
             * 
             * Resources:
             * - Info Windows: https://developers.google.com/maps/documentation/javascript/infowindows
             */
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <h3>${vName}</h3>
                    <p><strong>Country:</strong> ${country}</p>
                    <p><strong>Subregion:</strong> ${subregion}</p>
                    <p><strong>Elevation:</strong> ${elevation_m} meters</p>
                    <a href="${webpage}" target="_blank">More Info</a>
                `,
            });

            // Add a click event listener to the marker to open the info window
            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        } else {
            console.warn("Missing latitude or longitude for volcano:", volcano); // Warn if coordinates are missing
        }
    });
}

// Initialize the map on page load
initMap();
