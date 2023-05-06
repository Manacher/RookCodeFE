<template>
  <div class="user-list-area">
    <a-tabs v-model:activeKey="activeKey"
            style="padding: 0.5rem 1.5rem;">

      <a-tab-pane key="1">
        <template #tab>
        <span>
          <field-time-outlined />
          最近通过
        </span>
        </template>

        <div style="display: inline-block; width: 100%">
          <UserRecentPassList :account="account"/>
        </div>



      </a-tab-pane>

      <a-tab-pane key="2">
        <template #tab>
        <span>
          <profile-outlined/>
          题解
        </span>
        </template>

        <div style="display: inline-block; width: 100%">
          <UserPublishList :account="account"/>
        </div>

      </a-tab-pane>


    </a-tabs>
  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import UserRecentPassList from "@/components/UserPage/UserRecentPassList.vue";
import UserPublishList from "@/components/UserPage/UserPublishList.vue";

export default {
  props: ['account'],
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
  box-shadow: 0 2px 8px lightgrey;
}

</style>