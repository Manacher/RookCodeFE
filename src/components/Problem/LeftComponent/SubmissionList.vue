<template>
  <a-table bordered :data-source="dataSource" :columns="columns" >
    <template #bodyCell="{ column, text, record}">
      <template v-if="column.dataIndex === 'result'">
        <a v-if="text === 'ACCEPT'" style="color: green" :href="getUrl(record.id)" target="_blank">{{text}}</a>
        <a v-else style="color: red" :href="getUrl(record.id)" target="_blank">{{text}}</a>
      </template>
      <template v-if="column.dataIndex === 'submitDate'">
        {{moment(text).fromNow()}}
      </template>
      <template v-if="column.dataIndex === 'execTime'">
        {{text}} ms
      </template>
      <template v-if="column.dataIndex === 'memory'">
        {{text}} KB
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import {onMounted, ref, Ref} from "vue";
import moment from "moment/moment";
import axios from "axios";
import store from "@/store";
import {useRoute} from "vue-router";

moment.locale('zh-cn');

interface DataItem{
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
    const { params } = useRoute()
    const dataSource: Ref<DataItem[]> = ref([])  // 列表数据


    // ajax异步请求数据
    onMounted(() => {
      axios.get("http://175.178.221.165:8081/records/GetList/"+store.state.id+"/"+params.pro_id,
          {
            headers: {'Authorization': store.state.token}
          }
      ).then(res=>{
        const data = res.data.data
        dataSource.value = data
      }, err=>{
        console.log(err.data)
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
    }
  }
}
</script>

<style scoped>

</style>