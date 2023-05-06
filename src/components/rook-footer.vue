<template>
  <a-layout-footer style="text-align: center" v-if="!isProblem">
    RookCode ©2023 Developed by 代码民工再体验
  </a-layout-footer>
</template>

<script lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  name: "rook-footer",
  setup() {

    let route = useRoute();
    const isProblem = computed(() => {
      if (route.path.split("/")[1] === 'problems') {
        return true;
      } else {
        return false;
      }
    });
    return {
      isProblem,
    }
  }
}
</script>

<style scoped>

</style>