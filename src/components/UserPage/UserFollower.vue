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

    <a-divider type="vertical" style="height: 2rem" />

    <div
      class="subscribe-item"
      style="margin-right: auto; margin-left: 1.5rem"
      @click="onFolloweeListClicked"
    >
      <div style="color: #5c5c5c">关注者</div>
      <div style="color: #262626">{{ followInfo.followee }}</div>
    </div>
  </div>

  <a-modal
    v-model:visible="visible"
    :footer="null"
    style="border-radius: 2rem; width: 40rem"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" :tab="`关注了 ${followInfo.follower}`">
        <FollowerList :isFollower="true" style="height: 37rem" />
      </a-tab-pane>
      <a-tab-pane key="2" :tab="`关注者 ${followInfo.followee}`">
        <FollowerList :isFollower="false" style="height: 37rem" />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import FollowerList from "@/components/UserPage/FollowerList.vue";

export default {
  name: "UserSubscribe",
  components: { FollowerList },
  setup() {
    let followInfo = ref({
      follower: 0,
      followee: 0,
    });

    let visible = ref(true);
    let activeKey = ref("1");

    let onFollowerListClicked = () => {
      console.log("follower list clicked");
      visible.value = true;
    };

    let onFolloweeListClicked = () => {
      console.log("followee list clicked");
      visible.value = true;
    };

    onMounted(() => {
      let content = document.querySelector(".ant-modal-content") as HTMLElement;
      content.style.borderRadius = "0.7rem";

      let body = document.querySelector(".ant-modal-body") as HTMLElement;
      body.style.padding = "1.5rem 0 0 1.5rem";
    });

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

/*.ant-modal-content {*/
/*  border-radius: 1rem;*/
/*}*/
</style>
