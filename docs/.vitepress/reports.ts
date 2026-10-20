import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { TAGS, type TagId } from './tags'

// 日報檔名是 YYYY-MM-DD.md（發布日），第一個 # 標題是主題
export interface Report {
  date: string
  title: string
  link: string
  tag: TagId | null
}

const reportsDir = fileURLToPath(new URL('../reports', import.meta.url))
const REPORT_FILE = /^(\d{4})-(\d{2})-(\d{2})\.md$/
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/

export function getReports(): Report[] {
  return readdirSync(reportsDir)
    .filter((file) => REPORT_FILE.test(file))
    .map((file) => {
      const date = file.slice(0, -'.md'.length)
      const src = readFileSync(join(reportsDir, file), 'utf8')
      const frontmatter = FRONTMATTER.exec(src)?.[1] ?? ''
      const body = src.replace(FRONTMATTER, '')
      const title = /^#\s+(.+)$/m.exec(body)?.[1].trim() || date
      const tag = /^tag:\s*(\w+)/m.exec(frontmatter)?.[1] ?? ''
      return { date, title, link: `/reports/${date}`, tag: tag in TAGS ? (tag as TagId) : null }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

const WEEKDAYS = '日一二三四五六'

// reports/2026-10-20.md → 2026 年 10 月 20 日 星期二；不是日報就回傳 null
export function reportDateLabel(relativePath: string): string | null {
  const m = /^reports\/(\d{4})-(\d{2})-(\d{2})\.md$/.exec(relativePath)
  if (!m) return null
  const [, y, mo, d] = m
  const weekday = WEEKDAYS[new Date(Date.UTC(+y, +mo - 1, +d)).getUTCDay()]
  return `${y} 年 ${+mo} 月 ${+d} 日 星期${weekday}`
}
