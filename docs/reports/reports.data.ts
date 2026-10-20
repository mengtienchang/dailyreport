import { getReports, type Report } from '../.vitepress/reports'

declare const data: Report[]
export { data }

export default {
  watch: ['./*.md'],
  load: () => getReports()
}
