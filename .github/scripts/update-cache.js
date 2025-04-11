// 导入 ESM 模块
import fetch from 'node-fetch';           // 使用 ESM 导入 node-fetch [oai_citation_attribution:4‡npmjs.com](https://www.npmjs.com/package/node-fetch#:~:text=CommonJS)
import admin from 'firebase-admin';       // 导入 Firebase Admin SDK

// （可选）导入 Firebase 管理员 SDK 的服务账户密钥配置
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// 初始化 Firebase 应用（避免重复初始化）
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com'  // 替换为实际数据库URL
  });
}

// 异步更新缓存函数
async function updateCache() {
  // 1. 获取需要缓存的数据（例如从某 API 获取最新数据）
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  
  // 2. 更新 Firebase Realtime Database 中的缓存节点
  const db = admin.database();
  await db.ref('/path/to/cache').set(data);
  
  console.log('Cache updated at', new Date().toISOString());
}

// 执行更新函数并捕获错误
updateCache().catch(error => {
  console.error('更新缓存时出错:', error);
});
