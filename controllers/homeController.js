// Import firebase and getUserData function
import firebase, { getUserData } from '../assets/js/firebase.js';

// Define HomeController class
class HomeController {
    constructor() {
        // Initialize Firebase database
        this.database = firebase.database();
    }

    // Method to fetch user data from Firebase
    async fetchUserData() {
        try {
            // Call getUserData function to get data from Firebase
            const userData = await getUserData();
            // Return the fetched user data
            return userData;
        } catch (error) {
            // Log and handle any errors that occur during data fetching
            console.error("Error fetching user data:", error);
            return null;
        }
    }

    // Method to initialize the home page
    async init() {
        try {
            // Fetch user data from Firebase
            const userData = await this.fetchUserData();
            // If user data is available, you can proceed with initializing the home page
            if (userData) {
                // Code to initialize home page with fetched user data
                console.log("User data fetched successfully:", userData);
            } else {
                // Handle the case when user data is not available
                console.log("No user data available");
            }
        } catch (error) {
            // Log and handle any errors that occur during initialization
            console.error("Error initializing home page:", error);
        }
    }
}

// Export HomeController class for use in other modules
export default HomeController;
