<template>
  <div class="discussion-main-area">
    <a-back-top />
    <DiscussionList />
  </div>
</template>

<script lang="ts">
import DiscussionList from "@/components/Discussion/DiscussionList.vue";

export default {
  name: "DiscussionPage",
  components: {
    DiscussionList,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.discussion-main-area {
  background-color: #f0f2f5;
  padding: 1rem;
}
</style>
