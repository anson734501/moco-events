const fetch = require('node-fetch');
const { initializeApp, getDatabase, credential } = require('firebase-admin');
const serviceAccount = require('./my-realtime-database-cc6b7-firebase-adminsdk-fbsvc-xxxxxxxxxx.json'); // 注意改成你真实的文件名

initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: "https://my-realtime-database-cc6b7.firebaseio.com"
});

const db = getDatabase();

(async () => {
  try {
    const response = await fetch("https://xxx.com/data.json"); // 换成你的数据源
    const data = await response.json();

    await db.ref('mocoCache').set({
      updatedAt: new Date().toISOString(),
      data
    });

    console.log("Firebase 更新成功");
  } catch (err) {
    console.error("Firebase 更新失败：", err);
    process.exit(1); // 确保 GitHub Actions 检测到失败
  }
})();
