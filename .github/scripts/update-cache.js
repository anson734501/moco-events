import fetch from 'node-fetch';
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { credential } from 'firebase-admin';
import serviceAccount from '../../my-realtime-database-xxxxxx.json' assert { type: 'json' };

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://my-realtime-database-xxxxxx.firebaseio.com'
});

const db = getDatabase();

(async () => {
  try {
    const response = await fetch("https://api.example.com/events");
    const data = await response.json();

    await db.ref('mocoCache').set({
      updatedAt: Date.now(),
      data: data
    });

    console.log("✅ Firebase 更新完成");
  } catch (err) {
    console.error("❌ 更新失败：", err);
  }
})();
