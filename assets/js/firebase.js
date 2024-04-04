// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDyz-JGQ7DrOROYsMAAuMH57rA_I9Zdm08",
    authDomain: "consumo-api-628e4.firebaseapp.com",  
    databaseURL: "https://consumo-api-628e4-default-rtdb.firebaseio.com",
    projectId: "consumo-api-628e4",
    storageBucket: "consumo-api-628e4.appspot.com",
    messagingSenderId: "1055788061122",
    appId: "1:1055788061122:web:da659881b0505a64be865b",
    measurementId: "G-2RK9KGXLH9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Realtime Database
const database = getDatabase(app);

// Función para obtener datos de la base de datos
export const getUserData = () => {
    return get(ref(database, 'api/user'))
      .then(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
          return null;
        }
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
        return null;
      });
  };
