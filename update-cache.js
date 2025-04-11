name: Update Firebase Cache

on:
  schedule:
    - cron: '0 * * * *'  # 每小时整点运行一次
  workflow_dispatch:

jobs:
  update_cache:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install firebase-admin node-fetch

      - name: List current directory for debug
        run: ls -R

      - name: Run update script
        run: node ./.github/scripts/update-cache.js
