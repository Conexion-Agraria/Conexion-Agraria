// Import the firebase database module
import firebase from '../assets/js/firebase.js';

// Define FirebaseModel class
class firebaseModel {
    constructor() {
        // Initialize Firebase database
        this.database = firebase.database();
    }

    // Method to get data from Firebase
    async getUserData() {
        try {
            // Fetch data from Firebase
            const snapshot = await this.database.ref('api/user').once('value');
            // Extract and return the data from the snapshot
            return snapshot.val();
        } catch (error) {
            // Log and handle any errors that occur during data fetching
            console.error("Error fetching user data:", error);
            return null;
        }
    }
}

// Export FirebaseModel class for use in other modules
export default firebaseModel;
