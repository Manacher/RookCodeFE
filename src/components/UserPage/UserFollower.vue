<template>
  <div class="subscribe-main-area">
    <div
      class="subscribe-item"
      style="margin-left: auto; margin-right: 1.5rem"
      @click="onFollowerListClicked"
    >
      <div style="color: #5c5c5c">关注了</div>
      <div style="color: #262626">{{ followInfo.follower }}</div>
    </div>

    <a-divider
      type="vertical"
      style="height: 1.8rem; color: #e5e5e5; margin-top: 0.6rem"
    />

    <div
      class="subscribe-item"
      style="margin-right: auto; margin-left: 1.5rem"
      @click="onFolloweeListClicked"
    >
      <div style="color: #5c5c5c">关注者</div>
      <div style="color: #262626">{{ followInfo.followee }}</div>
    </div>
  </div>

  <a-modal v-model:visible="visible" style="width: 40rem" :footer="null">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" :tab="`关注了 ${followInfo.follower}`">
        <FollowerList
          :isFollower="true"
          :account="account"
          style="height: 37rem"
        />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="`关注者 ${followInfo.followee}`">
        <FollowerList
          :isFollower="false"
          :account="account"
          style="height: 37rem"
        />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
import FollowerList from "@/components/UserPage/FollowerList.vue";
import { getUserFollowerNum } from "@/components/UserPage/userPageHttp";
import { message } from "ant-design-vue";

export default {
  name: "UserSubscribe",
  components: { FollowerList },
  props: ["account", "loading"],
  setup(props: any, context: any) {
    let followInfo = ref({
      follower: 0,
      followee: 0,
    });

    let visible = ref(false);
    let activeKey = ref("1");
    let modalInit = false;

    let onFollowerListClicked = () => {
      activeKey.value = "1";
      visible.value = true;
      if (!modalInit) {
        setTimeout(() => {
          setModalStyle();
        }, 100);
        modalInit = true;
      }
    };

    let onFolloweeListClicked = () => {
      activeKey.value = "2";
      visible.value = true;
      if (!modalInit) {
        setTimeout(() => {
          setModalStyle();
        }, 100);
        modalInit = true;
      }
    };

    let setModalStyle = () => {
      let content = document.querySelector(".ant-modal-content") as HTMLElement;
      content.style.borderRadius = "0.7rem";
      let body = document.querySelector(".ant-modal-body") as HTMLElement;
      body.style.padding = "1.5rem 0 0 1.5rem";
    };

    let initFollowerNum = () => {
      getUserFollowerNum(props.account).then((res: any) => {
        console.log("init follower num", res);
        if (res.success) {
          let data = res.data;
          console.log("init follower num", data);
          followInfo.value.follower = data.followerNum;
          followInfo.value.followee = data.followeeNum;
        } else {
          message.error(res.message);
        }
      });
    };

    // loading变化代表account已被获取，调用初始化函数
    watch(
      () => props.loading,
      (newValue, oldValue) => {
        initFollowerNum();
      }
    );

    return {
      followInfo,
      visible,
      activeKey,
      onFollowerListClicked,
      onFolloweeListClicked,
    };
  },
};
</script>

<style scoped>
.subscribe-main-area {
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
}

.subscribe-item:hover {
  cursor: pointer;
}

.ant-modal-content {
  border-radius: 0.7rem;
}

/*.ant-modal-content {*/
/*  border-radius: 1rem;*/
/*}*/
</style>
