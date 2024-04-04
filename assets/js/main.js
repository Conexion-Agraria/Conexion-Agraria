// Import the function to get data from Firebase
import { getUserData } from "./firebase.js";
import cardLand from "./cardsLand.js";

// Function to initialize the application
function initApp() {
    // Application initialization logic, if needed
}

// Function to display the data obtained from Firebase in the user interface
function displayUserData(userData) {
    // Here you can manipulate the DOM to display the data on your HTML page
    // For example, you could update HTML elements with the information obtained from Firebase
    console.log("User data:", userData);
}

// Event handler when the DOM has been fully loaded
document.addEventListener("DOMContentLoaded", async function() {
    // Initialize your application
    initApp();

    // Get user data from Firebase
    const userData = await getUserData();

    // Display the data in the user interface
    displayUserData(userData);
    // Get land data (if not already available)
    const landData = getLandData(); // This function should get the land data somehow

    // Create an instance of CardLand
    const cardLand = new CardLand();

    // Assuming landData is an array with land data obtained from Firebase
    landData.forEach(land => {
        cardLand.createCard(land);
    });
});