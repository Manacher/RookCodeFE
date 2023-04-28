<template>
  <div class="submission-list-main">
    <a-table bordered :data-source="dataSource" :columns="columns" :loading="loading">
      <template #bodyCell="{ column, text, record}">
        <template v-if="column.dataIndex === 'result'">
          <a v-if="text === 'ACCEPT'" style="color: green" :href="getUrl(record.id)" target="_blank">{{ text }}</a>
          <a v-else style="color: red" :href="getUrl(record.id)" target="_blank">{{ text }}</a>
        </template>
        <template v-if="column.dataIndex === 'submitDate'">
          {{ moment(text).fromNow() }}
        </template>
        <template v-if="column.dataIndex === 'execTime'">
          {{ text }} ms
        </template>
        <template v-if="column.dataIndex === 'memory'">
          {{ text }} KB
        </template>
      </template>
    </a-table>
  </div>

</template>

<script lang="ts">
import {onMounted, ref, Ref} from "vue";
import moment from "moment/moment";
import axios from "axios";
import store from "@/store";
import {useRoute} from "vue-router";

moment.locale('zh-cn');

interface DataItem {
  id: string;
  result: string,
  execTime: string,
  memory: string,
  langName: string,
  submitDate: string,
}

export default {
  name: "SubmissionList",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props: any, context: any) {
    // 获取路由参数
    const {params} = useRoute()
    const dataSource: Ref<DataItem[]> = ref([])  // 列表数据
    const loading = ref(false)


    // ajax异步请求数据
    onMounted(() => {
      loading.value=true;
      axios.get("http://175.178.221.165:8081/records/GetList/" + params.pro_id,
          {
            headers: {'Authorization': store.state.token}
          }
      ).then(res => {
        const data = res.data.data
        dataSource.value = data
        loading.value = false;
      }, err => {
        console.log(err.data)
        loading.value = false;
      })
    })

    // 获取提交详情url
    const getUrl = (id: string) => {
      return "/submissions/detail/" + id
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
          dataIndex: 'execTime',
          key: 'execTime',
        },
        {
          title: '内存消耗',
          dataIndex: 'memory',
          key: 'memory',
        },
        {
          title: '语言',
          dataIndex: 'langName',
          key: 'langName',
        },
        {
          title: '提交时间',
          dataIndex: 'submitDate',
          key: 'submitDate',
        },
      ],
      getUrl,
      moment,
      loading,
    }
  }
}
</script>

<style scoped>

.submission-list-main {
  padding-right: 1rem;
}
</style>