import fetch from 'node-fetch';
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import serviceAccount from './firebase-key.json' assert { type: 'json' };

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://my-realtime-database-cc6b7.firebaseio.com"
});

const db = getDatabase();

const run = async () => {
  try {
    const response = await fetch("https://你的接口地址");
    const data = await response.json();
    await db.ref('mocoCache').set({
      updatedAt: new Date().toISOString(),
      data: data
    });
    console.log("更新成功");
  } catch (err) {
    console.error("更新失败：", err);
  }
};

run();
