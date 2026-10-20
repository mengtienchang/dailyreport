# Daily Report

用 [VitePress](https://vitepress.dev) 建的日報站，push 到 `main` 後由 Cloudflare Workers 自動構建並部署（設定見 `wrangler.jsonc`）。

## 本機開發

```bash
npm install
npm run docs:dev      # 開發伺服器
npm run docs:build    # 產生靜態檔到 docs/.vitepress/dist
npm run docs:preview  # 預覽 build 結果
```

## 新增日報

在 `docs/reports/` 新增 `YYYY-MM-DD.md`（日期是發布日），可以從 `docs/reports/_template.md` 複製：frontmatter 的 `tag` 填分類（`why` 選擇與理由、`what` 概念與知識、`how` 做法與步驟），第一行寫 `# 主題`。標題下的日期副標和分類、側邊欄、日報列表都會自動產生。分類定義在 `docs/.vitepress/tags.ts`。

想寫但還沒寫的題目記在 `ideas.md`。
