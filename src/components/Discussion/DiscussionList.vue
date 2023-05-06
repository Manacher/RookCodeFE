<template>
  <div class="discussion-list-main-area">
    <div class="top-area">
      <a-input-search
        v-model:value="inputValue"
        placeholder="搜索感兴趣的内容"
        style="width: 15rem; margin-right: 1rem"
        @search="onSearch"
      />

      <button id="create-button" @click="onCreateClicked">
        <tag-outlined />
        发起讨论
      </button>
    </div>

    <a-list
      :data-source="discussion_list"
      :loading="loading"
      item-layout="horizontal"
      style="margin-top: 2rem; margin-bottom: 4rem"
    >
      <template #renderItem="{ item }">
        <a-list-item
          class="discussion-list-item"
          @click="onListItemClicked(item.ID)"
          style="
            text-align: left;
            background-color: white;
            border-top: 1px solid #e5e5e5;
            padding-bottom: 0rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 5px 1px rgba(213, 207, 207, 0.73);
          "
        >
          <a-comment style="padding: 0 1rem 0 1rem; border-radius: 0.5rem">
            <template #actions>
              <span
                key="comment-basic-like"
                style="font-size: 0.8rem; color: #595959"
              >
                <template v-if="item.is_liked">
                  <LikeFilled
                    style="color: #00c36c"
                    @click="changeLikeStatus(item)"
                  />
                </template>
                <template v-else>
                  <LikeOutlined @click="changeLikeStatus(item)" />
                </template>

                <span style="padding-left: 8px; cursor: auto">
                  {{ item.like_num }}
                </span>
              </span>

              <span
                key="comment-basic-view"
                style="font-size: 0.8rem; color: #595959"
              >
                <eye-outlined />
                <span style="padding-left: 8px; cursor: auto">
                  {{ item.view_num }}
                </span>
              </span>

              <span style="font-size: 0.8rem; color: #595959">
                <comment-outlined />
                <span style="padding-left: 8px; cursor: auto">
                  {{ item.comment_num }}
                </span>
              </span>
            </template>

            <template #author>
              <span style="font-size: 1rem; color: #262626">
                {{ item.title }}
              </span>
            </template>
            <template #avatar>
              <a-avatar :src="item.avatar" alt="avatar" />
            </template>
            <template #content>
              <div style="margin-top: 0.5rem">
                <span style="font-size: 0.9rem; color: #8c8c8c">
                  {{ item.description }}
                </span>
              </div>
            </template>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>

    <a-pagination
      v-model:current="pagination"
      :total="pagination.total"
      style="
        padding-bottom: 1rem;
        padding-top: 1rem;
        position: absolute;
        bottom: 0;
        right: 0;
      "
      @change="tableChange"
    >
      <template #itemRender="{ type, originalElement }">
        <a v-if="type === 'prev'">前一页</a>
        <a v-else-if="type === 'next'">后一页</a>
        <component :is="originalElement" v-else></component>
      </template>
    </a-pagination>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios/index";

export default {
  name: "DiscussionList",

  setup() {
    const pagination = ref({
      current: 1,
      total: 1,
      pageSize: 15,
    });

    const discussion_list = ref([
      {
        id: 0,
        avatar:
          "https://assets.leetcode.cn/aliyun-lc-upload/uploaded_files/2021/03/73c9f099-abbe-4d94-853f-f8abffd459cd/leetcode.png?x-oss-process=image%2Fresize%2Ch_44%2Cw_44%2Fformat%2Cwebp",
        title: "如何在「求职面试」中发布一篇帖子？",
        description:
          "为了更好地让大家看到你宝贵的面经和经验分享，我们为大家提供了一些关于如何在「求职面试」中发布一篇帖子的建议，快速掌握正确发帖姿势。 你的标题应当包含所面试的企业和职级，并尽可能按照以下格式编写： 举个",
        view_num: 25100,
        like_num: 128,
        comment_num: 118,
        is_liked: false,
      },
      {
        id: 1,
        avatar:
          "https://assets.leetcode.cn/aliyun-lc-upload/users/jin-yan-x1/avatar_1677743212.png?x-oss-process=image%2Fresize%2Ch_44%2Cw_44%2Fformat%2Cwebp",
        title: "面试经验｜华为OD，Java面经，东莞",
        description: "123",
        view_num: 123,
        like_num: 123,
        comment_num: 118,
        is_liked: true,
      },
      {
        id: 2,
        avatar:
          "https://assets.leetcode.cn/aliyun-lc-upload/users/cjw-e/avatar_1637496803.png?x-oss-process=image%2Fresize%2Ch_44%2Cw_44%2Fformat%2Cwebp",
        title: "求助｜请问除了大厂外企还有哪些厂考算法？",
        description: "123",
        view_num: 123,
        like_num: 123,
        comment_num: 118,
        is_liked: false,
      },
    ]);
    let loading = ref(false);

    let inputValue = ref("");

    //页码改变的事件
    let tableChange = (page: number) => {
      pagination.value.current = page;
      console.log("tableChange", page);
    };

    let onSearch = () => {
      console.log("onSearch", inputValue.value);
    };

    let onListItemClicked = (id: number) => {
      console.log("onListItemClicked", id);
    };

    let changeLikeStatus = (item: any) => {
      if (item.is_liked) {
        item.like_num--;
      } else {
        item.like_num++;
      }
      item.is_liked = !item.is_liked;
    };

    let onCreateClicked = () => {
      console.log("onCreateClicked");
    };

    return {
      loading,
      discussion_list,
      pagination,
      inputValue,
      tableChange,
      onSearch,
      onListItemClicked,
      changeLikeStatus,
      onCreateClicked,
    };
  },
};
</script>

<style scoped>
.discussion-list-main-area {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 20rem;
  width: 50rem;
}

.top-area {
  /*float: right;*/
  position: absolute;
  right: 0;
}

.discussion-list-item:hover {
  cursor: pointer;
  background-color: #f7f7f8 !important;
  transition: background-color 0.3s ease-in-out !important;
}

#create-button {
  background-color: #2db55d;
  border-radius: 1rem;
  border: none;
  color: #fff;
  padding: 0.3rem 0.7rem 0.3rem 0.7rem;
}

#create-button:hover {
  background-color: #269a4f;
  cursor: pointer;
  transition: ease-in-out 0.15s;
}
</style>
