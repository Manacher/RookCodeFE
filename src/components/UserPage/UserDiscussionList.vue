<template>
  <a-list
    item-layout="horizontal"
    id="publish-list"
    size="large"
    :pagination="pagination"
    :data-source="discussionList"
    :loading="loading"
    style="width: 100%"
  >
    <template #renderItem="{ item, index }">
      <a-list-item
        key="item.title"
        @click="onTitleClicked(item.id)"
        :style="{
          'background-color': index % 2 === 1 ? '#fff' : '#f7f7f8',
          'border-radius': index % 2 === 1 ? '0' : '0.35rem',
          border: 'none',
        }"
      >
        <template #actions>
          <a-space direction="horizontal">
            <div class="publish-list-action-item" style="width: 4rem">
              <like-outlined style="margin-right: 0.3rem" />
              {{ item.like_num }}
            </div>
            <div class="publish-list-action-item" style="width: 4rem">
              <eye-outlined style="margin-right: 0.3rem" />
              {{ item.view_num }}
            </div>

            <div class="publish-list-action-item" style="width: 4rem">
              <comment-outlined style="margin-right: 0.3rem" />
              {{ item.comments_num }}
            </div>

            <div class="publish-list-action-item" style="width: 4rem">
              {{ item.date }}
            </div>

            <a @click.stop="onEditClicked(item.id)" v-if="myAccount === account"
              >编辑</a
            >
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
import { ref } from "vue";
import {
  getUserDiscussionList,
  getUserPublishList,
} from "@/components/UserPage/userPageHttp";
import moment from "moment/moment";
import { message } from "ant-design-vue";
import store from "@/store";

interface DiscussionListData {
  id: number;
  avatar: string;
  title: string;
  description: string;
  view_num: number;
  like_num: number;
  comments_num: number;
  date: string;
}

interface DiscussionRespData {
  id: number;
  avatar: string;
  title: string;
  description: string;
  view_num: number;
  like_num: number;
  comments_num: number;
}

let loading = ref(false);

export default {
  props: ["account"],
  name: "UserDiscussionList",
  setup(props: any, context: any) {
    let pagination = ref({
      current: 1,
      pageSize: 15,
      total: 1,
      showSizeChanger: false,
      onChange: (page: number) => {
        handleQuery(page);
      },
    });

    let discussionList = ref<DiscussionListData[]>([]);
    let myAccount = ref("");
    myAccount.value = store.state.account;

    let handleQuery = (page: number) => {
      loading.value = true;
      getUserDiscussionList(props.account, page).then((res: any) => {
        if (res.success) {
          let data = res.data;

          pagination.value.total = data.total_cnt * pagination.value.pageSize;
          pagination.value.current = page;

          discussionList.value = [];
          moment.locale("zh-cn");

          data.discussionList.forEach((val: any) => {
            discussionList.value.push({
              id: val.id,
              avatar: val.avatar,
              title: val.title,
              description: val.description.replace(/<.*?>/g, ""),
              view_num: val.view_num,
              like_num: val.like_num,
              comments_num: val.comments_num,
              date: moment(val.dateTime).fromNow(),
            });
          });
          loading.value = false;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          message.error(res.message);
          loading.value = false;
        }
      });
    };

    handleQuery(pagination.value.current);

    let onTitleClicked = (id: number) => {
      window.open(`/discussion/detail/${id}`);
    };

    let onEditClicked = (id: number) => {
      window.open(`/edit-discussion/${id}`);
    };

    return {
      pagination,
      discussionList,
      loading,
      myAccount,
      onTitleClicked,
      onEditClicked,
    };
  },
};
</script>

<style scoped>
.publish-list-action-item {
  margin-right: 0.5rem;
  text-align: right;
}

#publish-list .ant-list-item {
  cursor: pointer;
}

#publish-list .ant-list-item:hover {
  background-color: #eff0f2 !important;
  transition: background-color 0.2s ease-in-out !important;
  border-radius: 0.35rem !important;
}
</style>
