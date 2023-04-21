<template>
  <div class="user-list-area">
    <a-tabs v-model:activeKey="activeKey"
            style="padding: 0.5rem 1rem;">

      <a-tab-pane key="1">
        <template #tab>
        <span>
          <field-time-outlined />
          最近通过
        </span>
        </template>

        <div style="display: inline-block;">
          <UserRecentPassList/>
        </div>





      </a-tab-pane>

      <a-tab-pane key="2">
        <template #tab>
        <span>
          <profile-outlined/>
          题解
        </span>
        </template>

        <!--    todo 题解发布列表-->
        <UserPublishList style="width: 50rem"/>

      </a-tab-pane>


    </a-tabs>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import UserRecentPassList from "@/views/userPage/UserRecentPassList.vue";
import UserPublishList from "@/views/userPage/UserPublishList.vue";

export default {
  name: "user-list",
  components: {UserPublishList, UserRecentPassList},
  setup() {
    return {
      activeKey: ref('1'),
    };
  },
}
</script>

<style scoped>

.user-list-area {
  background-color: white;
  border-radius: 1rem;
  text-align: left;
  width: 100%;
}

</style>