import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'

export default defineConfig({
  lang: 'zh-TW',
  title: 'Daily Report',
  description: '每日日報',
  lastUpdated: true,
  cleanUrls: true,
  srcExclude: ['**/_template.md'],

  markdown: {
    config(md) {
      // ::: claude [標題] … ::: → Claude 的橘色提醒框，樣式在 theme/custom.css
      md.use(container, 'claude', {
        render(tokens, idx) {
          const token = tokens[idx]
          if (token.nesting !== 1) return '</div>\n'
          const title = token.info.trim().slice('claude'.length).trim() || 'Claude 溫馨提醒'
          return `<div class="claude-note custom-block"><p class="custom-block-title">${md.utils.escapeHtml(title)}</p>\n`
        }
      })
    }
  },

  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '日報', link: '/reports/' }
    ],

    sidebar: {
      '/reports/': [
        {
          text: '2026 / 10',
          items: [
            { text: '10/19', link: '/reports/2026-10-19' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mengtienchang/dailyreport' }
    ],

    search: { provider: 'local' },

    outline: { label: '本頁目錄' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最後更新' },
    returnToTopLabel: '回到頂部',
    sidebarMenuLabel: '選單',
    darkModeSwitchLabel: '外觀'
  }
})
