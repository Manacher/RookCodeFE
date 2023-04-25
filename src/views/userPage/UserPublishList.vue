<template>
  <a-list item-layout="horizontal"
          id="publish-list"
          size="large"
          :pagination="pagination"
          :data-source="publishList"
          :loading="loading"
          style="width: 100%">

    <template #renderItem="{item, index}">

      <a-list-item key="item.title"
                   @click="onTitleClicked(item.id)"
                   :style="{'background-color':(index%2 === 1 ? '#fff' : '#f7f7f8'),
                   'border-radius': (index%2 === 1 ? '0' : '0.35rem')}">

        <template #actions>

          <a-space direction="horizontal">
            <div class="publish-list-action-item" style="width: 2rem">
              <like-outlined style="margin-right: 0.3rem;"/>
              {{ item.like }}
            </div>
            <div class="publish-list-action-item" style="width: 2rem">
              <eye-outlined style="margin-right: 0.3rem;"/>
              {{ item.view }}
            </div>
            <div class="publish-list-action-item" style="width: 4rem">
              {{ item.date }}
            </div>
            <a @click="onEditClicked(item.id)">编辑</a>
          </a-space>


        </template>
        <div>
          <a style="color: #262626">{{ item.title }}</a>
        </div>
      </a-list-item>

    </template>
  </a-list>

</template>

<script lang="ts">

import {ref} from "vue";
import {getUserPublishList} from "@/views/userPage/userPageHttp";
import moment from "moment/moment";
import {message} from "ant-design-vue";

interface publishListData {
  title: string;
  view: number;
  like: number;
  date: string;
  id: number;
}

interface publishRespData {
  question_title: string;
  solution_title: string;
  view: number;
  like: number;
  date: string;
  id: number;
  question_id: number;
}

let loading = ref(false)

export default {
  props: ['account'],
  name: "UserPublishList",
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

    let publishList = ref<publishListData[]>([])

    let handleQuery = (page: number) => {
      loading.value = true;
      getUserPublishList(props.account, page).then((res: any) => {
        if (res.success) {
          let data = res.data;

          console.log("publish data", data.findSolutionRespList)

          pagination.value.total = data.total_page * pagination.value.pageSize;
          pagination.value.current = page;

          publishList.value = []
          moment.locale('zh-cn');

          let list = data.findSolutionRespList

          list.forEach((val: publishRespData) => {
            publishList.value.push({
              title: val.question_id + '. ' + val.question_title + ' - ' + val.solution_title,
              like: val.like,
              view: val.view,
              date: moment(val.date).fromNow(),
              id: val.id,
            })
          })
          loading.value = false;
        } else {
          message.error(res.message)
          loading.value = false;
        }
      })
    }

    handleQuery(pagination.value.current)

    let onTitleClicked = (id: number) => {
      window.open(`/solution/${id}`)
    }

    let onEditClicked = (id: number) => {
      window.open(`/solution/edit/${id}`)
    }


    return {
      pagination,
      publishList,
      loading,
      onTitleClicked,
      onEditClicked,
    };
  },
}
</script>

<style scoped>

.publish-list-action-item {
  margin-right: 0.5rem;
  /*margin-left: 0.5rem;*/
  text-align: right;
}


#publish-list .ant-list-item {
  cursor: pointer;
}

</style>