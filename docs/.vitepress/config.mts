import { defineConfig, type DefaultTheme } from 'vitepress'
import container from 'markdown-it-container'
import { getReports, reportDateLabel } from './reports'
import { tagBadge } from './tags'

// 側邊欄依月份分組，新的在上面
function reportsSidebar(): DefaultTheme.SidebarItem[] {
  const months = new Map<string, DefaultTheme.SidebarItem[]>()
  for (const r of getReports()) {
    const month = r.date.slice(0, 7).replace('-', ' / ')
    if (!months.has(month)) months.set(month, [])
    months.get(month)!.push({ text: r.title, link: r.link })
  }
  return [...months].map(([text, items]) => ({ text, items }))
}

export default defineConfig({
  lang: 'zh-TW',
  title: 'Daily Report',
  description: '每日日報',
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

      // 日報的 # 主題 下面自動加上日期副標和分類，日期取自檔名、分類取自 frontmatter 的 tag
      md.core.ruler.push('report-date', (state) => {
        const label = reportDateLabel(state.env?.relativePath ?? '')
        if (!label) return
        const i = state.tokens.findIndex((t) => t.type === 'heading_close' && t.tag === 'h1')
        if (i === -1) return
        const token = new state.Token('html_block', '', 0)
        token.content = `<p class="report-date">${label}${tagBadge(state.env.frontmatter?.tag)}</p>\n`
        state.tokens.splice(i + 1, 0, token)
      })
    }
  },

  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '日報', link: '/reports/' }
    ],

    sidebar: {
      '/reports/': reportsSidebar()
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mengtienchang/dailyreport' }
    ],

    search: { provider: 'local' },

    outline: { label: '本頁目錄' },
    // 側邊欄新的在上面，所以 prev 是較新的、next 是較舊的
    docFooter: { prev: '較新的日報', next: '較舊的日報' },
    returnToTopLabel: '回到頂部',
    sidebarMenuLabel: '選單',
    darkModeSwitchLabel: '外觀'
  }
})
