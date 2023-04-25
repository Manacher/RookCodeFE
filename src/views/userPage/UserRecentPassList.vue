<template>
  <a-list item-layout="horizontal"
          id="pass-list"
          size="large"
          :pagination="pagination"
          :data-source="passList"
          :loading="loading"
          @change="handleListChange"
          style="width: 100%">

    <template #renderItem="{item, index}">
      <a-list-item key="item.title"
                   @click="onTitleClicked(item.id)"
                   :style="{'background-color':(index%2 === 1 ? '#fff' : '#f7f7f8'),
                   'border-radius': (index%2 === 1 ? '0' : '0.35rem')}">
        <template #actions>
          <div>

            <a-space direction="horizontal">
              <div >提交时间</div>

              <div style="width: 4rem;text-align: right">{{ item.date }}</div>
            </a-space>


          </div>

        </template>
        <div>
          <a style="color: #262626">{{ item.title }}</a>
        </div>

      </a-list-item>
    </template>
  </a-list>

</template>

<script lang="ts">

import {getUserRecentPassList} from "@/views/userPage/userPageHttp";
import {ref} from "vue";
import {message} from "ant-design-vue";
import moment from 'moment';

interface passListData{
  title: string;
  date: string;
  id: number;
  question_id?: number;
}

let passList = ref<passListData[]>([])
let loading = ref(false)

export default {
  props: ['account'],
  name: "UserRecentPassList",
  setup(props: any, context: any) {


    let pagination = ref({
      current: 1,
      pageSize: 15,
      total: 15,
      showSizeChanger: false,
      onChange: (page: number) => {
        handleQuery(page)
      }
    });


    let onTitleClicked = (id: number) => {
      window.open(`/submission/${id}`)
    }

    let handleQuery = (page: number) => {
      loading.value = true;
      getUserRecentPassList(props.account, page).then((res: any) => {
        console.log("recent pass list", res)
        if(res.success){
          let data = res.data;

          pagination.value.total = data.total_page * pagination.value.pageSize;
          pagination.value.current = page;

          passList.value = []

          moment.locale('zh-cn');
          data.infoRespList.forEach((val : passListData) => {
            passList.value.push({
              title: val.question_id + '. ' + val.title,
              date: moment(val.date).fromNow(),
              id: val.id,
            })
          })
          loading.value = false;
        }else{
          message.error(res.message)
          loading.value = false;
        }
      })
    }

    handleQuery(pagination.value.current)

    let handleListChange = (pagination: any) => {
      console.log("handleListChange", pagination)
      handleQuery(pagination.current);
    };

    return {
      passList,
      pagination,
      loading,
      onTitleClicked,
      handleListChange,
    };
  },
}
</script>

<style scoped>

#pass-list .ant-list-item {
  cursor: pointer;
}

</style>