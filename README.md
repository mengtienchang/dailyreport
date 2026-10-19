# Daily Report

用 [VitePress](https://vitepress.dev) 建的每日日報站，push 到 `main` 後由 GitHub Actions 自動部署到 GitHub Pages：

https://mengtienchang.github.io/dailyreport/

## 本機開發

```bash
npm install
npm run docs:dev      # 開發伺服器
npm run docs:build    # 產生靜態檔到 docs/.vitepress/dist
npm run docs:preview  # 預覽 build 結果
```

## 新增日報

複製 `docs/reports/_template.md` 為 `docs/reports/YYYY-MM-DD.md`，再到 `docs/.vitepress/config.mts` 的 sidebar 加上連結。
