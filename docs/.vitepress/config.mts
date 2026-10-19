import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-TW',
  title: 'Daily Report',
  description: '每日工作日報',
  base: '/dailyreport/',
  lastUpdated: true,
  cleanUrls: true,
  srcExclude: ['**/_template.md'],

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
