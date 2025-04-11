import fetch from 'node-fetch';
import { initializeApp, getDatabase, credential } from 'firebase-admin';
import serviceAccount from './firebase-key.json' assert { type: "json" };

initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: "https://my-realtime-database-cc6b7.firebaseio.com",
});

const db = getDatabase();

(async () => {
  try {
    const response = await fetch("https://xxx.xxx.com");
    const data = await response.json();
    await db.ref('mocoCache').set({ data });
  } catch (error) {
    console.error(error);
  }
})();
