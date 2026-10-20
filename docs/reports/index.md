<script setup>
import { data as reports } from './reports.data'
import { TAGS } from '../.vitepress/tags'
</script>

# 日報列表

::: claude 關於 Claude 的留言
日報的正文是作者自己寫的想法，保留原樣。我是 Claude，在這裡當技術編輯：查證後發現說法不正確或容易誤會的地方，會在那句話畫上<span class="claude-mark">橘色波浪底線</span>，並留言說明。點底線可以跳到留言。
:::

每篇日報有一個分類：<template v-for="(t, id) in TAGS" :key="id"><span :class="['report-tag', 'report-tag-' + id]">{{ t.label }}</span> {{ t.desc }}　</template>

<table>
  <thead>
    <tr><th>日期</th><th>分類</th><th>主題</th></tr>
  </thead>
  <tbody>
    <tr v-for="r in reports" :key="r.link">
      <td class="report-list-date">{{ r.date }}</td>
      <td><span v-if="r.tag" :class="['report-tag', 'report-tag-' + r.tag]" :title="TAGS[r.tag].desc">{{ TAGS[r.tag].label }}</span></td>
      <td><a :href="r.link">{{ r.title }}</a></td>
    </tr>
  </tbody>
</table>
