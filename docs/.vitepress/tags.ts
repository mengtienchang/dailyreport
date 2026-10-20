// 分類：日報 frontmatter 寫 tag: why / what / how。這個檔案也會在瀏覽器裡用，不要引入 node 模組
export const TAGS = {
  why: { label: 'Why', desc: '選擇與理由' },
  what: { label: 'What', desc: '概念與知識' },
  how: { label: 'How', desc: '做法與步驟' }
} as const

export type TagId = keyof typeof TAGS

export function tagBadge(tag: unknown): string {
  if (typeof tag !== 'string' || !(tag in TAGS)) return ''
  const { label, desc } = TAGS[tag as TagId]
  return `<span class="report-tag report-tag-${tag}" title="${desc}">${label}</span>`
}
