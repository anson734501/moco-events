import fetch from 'node-fetch';
import { initializeApp, getDatabase } from 'firebase-admin/app';
import { cert } from 'firebase-admin/app';
import serviceAccount from './firebase-key.json' assert { type: 'json' };

// 初始化 Firebase
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://my-realtime-database-cc6b7.firebaseio.com"
});

const db = getDatabase();

const run = async () => {
  try {
    const response = await fetch("https://您的URL");
    const data = await response.json();
    await db.ref('mocoCache').set({
      updatedAt: new Date().toISOString(),
      data: data
    });
    console.log("缓存已更新");
  } catch (err) {
    console.error("更新失败:", err);
  }
};

run();
