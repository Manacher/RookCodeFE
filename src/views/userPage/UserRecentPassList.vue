<template>
  <a-list item-layout="horizontal" id="pass-list" size="large" :pagination="pagination" :data-source="passList"
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
}

// let listData: { title: string; date: string; id: number; }[] = [];
// for (let i = 0; i < 100; i++) {
//   listData.push({
//     title: `剑指Offer 12.矩阵中的路径 ${i}`,
//     date: '2021-05-01',
//     id: i,
//   });
// }

export default {
  props: ['account'],
  name: "UserRecentPassList",
  setup(props: any, context: any) {

    let pagination = ref({
      current: 1,
      pageSize: 15,
      total: 15,
      showSizeChanger: false,
    });

    let passList = ref<passListData[]>([])

    let onTitleClicked = (id: number) => {
      window.open(`/solution/${id}`)
    }

    let init = () => {
      getUserRecentPassList(props.account, 1).then((res: any) => {
        console.log("recent pass list", res)
        if(res.success){
          let data = res.data;
          pagination.value = data.total_page;

          moment.locale('zh-cn');

          data.infoRespList.forEach((val : passListData) => {
            passList.value.push({
              title: val.id + '. ' + val.title,
              date: moment(val.date).fromNow(),
              id: val.id,
            })
          })

        }else{
          message.error(res.message)
        }

      })
    }

    init();


    return {
      passList,
      pagination,
      onTitleClicked,
    };
  },
}
</script>

<style scoped>

#pass-list .ant-list-item {
  cursor: pointer;
}

</style>