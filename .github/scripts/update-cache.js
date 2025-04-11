const fetch = require('node-fetch');
const { initializeApp } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const { credential } = require('firebase-admin');
const serviceAccount = require('./firebase-key.json'); // 改成你的 key 文件路径

initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: "https://my-realtime-database-cc6b7-default-rtdb.firebaseio.com" // 改成你的
});

const db = getDatabase();

(async () => {
  try {
    const response = await fetch("https://你的接口地址"); // ←← 替换为真实接口
    const data = await response.json();

    await db.ref('mocoCache').set({
      serverTime: Date.now(),
      events: data
    });

    console.log("缓存更新成功");
  } catch (e) {
    console.error("缓存更新失败：", e);
  }
})();
