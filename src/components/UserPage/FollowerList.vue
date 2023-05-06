<template>
  <a-list item-layout="horizontal" :data-source="list" class="follower-list">
    <template #loadMore>
      <div
        v-if="!loading"
        :style="{
          textAlign: 'center',
          marginTop: '0.6rem',
          height: '32px',
          lineHeight: '32px',
          marginBottom: '0.6rem',
        }"
      >
        <a-button
          @click="onLoadMore"
          v-if="pagination.current !== pagination.total"
          >加载更多</a-button
        >
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item
        style="padding-right: 0.3rem; margin-right: 1.2rem"
        class="follow-list-item"
      >
        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <a-list-item-meta
            @click="onItemClick(item.account)"
            class="item-info"
          >
            <template #title>
              <div style="display: flex; flex-direction: column">
                <div style="color: #5c5c5c; font-size: 1.1rem">
                  <span>{{ item.nickname }}</span>
                </div>
                <div
                  style="
                    color: #c4c4c6;
                    font-size: 0.8rem;
                    display: inline-block;
                  "
                >
                  {{ item.account }}
                </div>
                <div
                  style="
                    color: #8a8a8e;
                    font-size: 0.9rem;
                    display: inline-block;
                  "
                >
                  {{ item.description }}
                </div>
              </div>
            </template>
            <template #avatar>
              <img
                :src="item.avatar"
                style="height: 4.5rem; width: 4.5rem; border-radius: 0.5rem"
              />
            </template>
          </a-list-item-meta>

          <div>
            <button
              class="follow-button"
              v-if="item.mutual"
              @click="cancelFollow(item, isFollower)"
            >
              互相关注
            </button>

            <button
              class="follow-button"
              v-else-if="item.follow"
              @click="cancelFollow(item, isFollower)"
            >
              已关注
            </button>

            <button
              class="unfollow-button"
              v-else
              @click="follow(item, isFollower)"
            >
              关注
            </button>
          </div>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from "vue";
import {
  followUser,
  unfollowUser,
  getUserFollowerListV2,
  getUserFolloweeListV2,
  getUserFollowerList,
  getUserFolloweeList,
} from "@/components/UserPage/userPageHttp";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
interface listData {
  account: string;
  avatar: string;
  description: string;
  nickname: string;
  mutual: boolean;
  follow?: boolean;
  loading?: boolean;
}

export default defineComponent({
  props: ["isFollower", "account"],
  name: "FollowerList",
  setup(props: any, context: any) {
    console.log("isFollower", props.isFollower);
    console.log("account", props.account);
    const loading = ref(false);
    const data = ref<listData[]>([]);
    const list = ref<listData[]>([]);
    const pagination = ref({
      current: 0,
      total: 1,
      pageSize: 10,
    });

    let loadFollowerData = (pageNum: number, pageSize: number) => {
      loading.value = true;
      getUserFollowerList(props.account, pageNum, pageSize).then((res: any) => {
        if (res.success) {
          let resData = res.data;
          pagination.value.total = resData.pageTotalNum;
          let listData = resData.followList.map((item: any) => {
            return {
              account: item.account,
              avatar: item.avatar,
              description: item.description,
              nickname: item.nickname,
              mutual: item.mutual,
              follow: item.followed,
            };
          });
          const newData = data.value.concat(listData);
          data.value = newData;
          list.value = newData;
          loading.value = false;
          nextTick(() => {
            window.dispatchEvent(new Event("resize"));
          });
        } else {
          loading.value = false;
          message.error(res.message);
        }
        loading.value = false;
      });
    };

    let loadFolloweeData = (pageNum: number, pageSize: number) => {
      loading.value = true;
      getUserFolloweeList(props.account, pageNum, pageSize).then((res: any) => {
        if (res.success) {
          let resData = res.data;
          pagination.value.total = resData.pageTotalNum;
          let listData = resData.followList.map((item: any) => {
            return {
              account: item.account,
              avatar: item.avatar,
              description: item.description,
              nickname: item.nickname,
              mutual: item.mutual,
              follow: item.followed,
            };
          });
          const newData = data.value.concat(listData);
          data.value = newData;
          list.value = newData;
          loading.value = false;
          nextTick(() => {
            window.dispatchEvent(new Event("resize"));
          });
        } else {
          loading.value = false;
          message.error(res.message);
        }
      });
    };

    onMounted(() => {
      onLoadMore();
    });

    let onLoadMore = () => {
      loading.value = true;
      pagination.value.current++;
      list.value = data.value.concat(
        [...new Array(pagination.value.pageSize)].map(() => ({
          loading: true,
          account: "",
          avatar: "",
          description: "",
          nickname: "",
          mutual: false,
        }))
      );
      if (props.isFollower) {
        loadFollowerData(pagination.value.current, pagination.value.pageSize);
      } else {
        loadFolloweeData(pagination.value.current, pagination.value.pageSize);
      }
    };

    let onItemClick = (account: string) => {
      window.open("/user/" + account);
    };

    let cancelFollow = (item: any) => {
      item.follow = false;
      item.mutual = false;
      unfollowUser(item.account).then((res: any) => {
        if (!res.success) {
          message.error(res.message);
        }
      });
    };

    let follow = (item: any) => {
      item.follow = true;
      item.mutual = true;
      followUser(item.account).then((res: any) => {
        if (!res.success) {
          message.error(res.message);
        }
      });
    };

    return {
      loading,
      data,
      list,
      pagination,
      onLoadMore,
      onItemClick,
      cancelFollow,
      follow,
    };
  },
});
</script>

<style scoped>
.follower-list {
  max-height: 37rem;
  overflow-y: scroll;
}
.follow-button {
  border: none;
  border-radius: 0.4rem;
  padding: 0.25rem 0.8rem 0.25rem 0.8rem;
  background-color: #f2f3f4;
  color: #595959;
}

.follow-button:hover {
  cursor: pointer;
  background-color: #e5e6e8;
  transition: background-color 0.2s ease-in-out;
}

.unfollow-button {
  border: none;
  border-radius: 0.4rem;
  padding: 0.15rem 0.8rem 0.15rem 0.8rem;
  background-color: #2db55d;
  color: #fff;
}

.unfollow-button:hover {
  cursor: pointer;
  background-color: #269a4f;
  transition: background-color 0.2s ease-in-out;
}

.follow-list-item:hover {
  background-color: #fbfbfb !important;
  transition: background-color 0.3s ease-in-out !important;
}

.item-info:hover {
  cursor: pointer;
}

.follower-list::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}

.follower-list::-webkit-scrollbar-track {
  background: #ffffff;
}

.follower-list::-webkit-scrollbar-thumb {
  background: #ececec;
  border-radius: 0.6rem;
}
</style>
