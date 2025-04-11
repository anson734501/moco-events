import fetch from 'node-fetch';
import { initializeApp, getDatabase } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import serviceAccount from '../my-realtime-database-cc6b7-firebase-adminsdk-fbsvc-9492802d76.json' assert { type: 'json' };

initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: "https://my-realtime-database-cc6b7-default-rtdb.firebaseio.com"
});

const db = getDatabase();

(async () => {
  try {
    const response = await fetch("https://example.com/data.json");
    const data = await response.json();

    await db.ref('mocoCache').set({
      timestamp: Date.now(),
      data
    });

    console.log("Firebase cache updated.");
  } catch (error) {
    console.error("Error updating Firebase cache:", error);
  }
})();
