<template>
  <a-table bordered :data-source="dataSource" :columns="columns" >
    <template #bodyCell="{ column, text, record}">
      <template v-if="column.dataIndex === 'result'">
        <a v-if="text === '通过'" style="color: green" :href="getUrl(record.key)">{{text}}</a>
        <a v-else style="color: red" :href="getUrl(record.key)">{{text}}</a>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">

import {ref, Ref} from "vue";

interface DataItem{
  key: string;
  result: string,
  time: string,
  memory: string,
  lang: string,
  date: string,
}

export default {
  name: "SubmissionList",

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const dataSource: Ref<DataItem[]> = ref([])  // 列表数据

    // TODO: 模拟请求数据
    setTimeout(() => {
      dataSource.value.push({key: "1", result: "通过",time: "28ms", memory: "3MB", lang: "c++", date: "2022-01-04"})
      dataSource.value.push({key: "2", result: "失败",time: "28ms", memory: "3MB", lang: "c++", date: "2022-01-04"})
      debugger
    }, 3000);

    // 获取提交详情url
    const getUrl = (key: string) => {
      // TODO
      return "https://leetcode.cn/submissions/detail/" + key
    }

    return {
      dataSource,
      columns: [
        {
          title: '提交结果',
          dataIndex: 'result',
          key: 'result',
        },
        {
          title: '执行用时',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '内存消耗',
          dataIndex: 'memory',
          key: 'memory',
        },
        {
          title: '语言',
          dataIndex: 'lang',
          key: 'lang',
        },
        {
          title: '提交时间',
          dataIndex: 'date',
          key: 'date',
        },
      ],
      getUrl,

    }
  }
}
</script>

<style scoped>

</style>