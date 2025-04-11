name: Update Firebase Cache

on:
  schedule:
    - cron: '*/5 * * * *'  # 每 5 分钟执行一次
  workflow_dispatch:       # 手动触发支持

jobs:
  update_cache:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install node-fetch firebase-admin

      - name: Run update script
        run: node update-cache.js
