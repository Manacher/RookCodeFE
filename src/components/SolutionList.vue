<template>
  <a-input-search
      v-model:value="searchText"
      placeholder="搜索题解"
      style="width: 200px"
      @search="onSearch"
  />
</template>

<script lang="ts">
import {ref} from "vue";

export default {
  name: "SolutionList",

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){
    const searchText = ref<string>('');

    const onSearch = (searchValue: string) => {
      console.log(searchValue)
      //TODO

    };

    return{
      searchText,
      onSearch,
    }
  }
}
</script>

<style scoped>

</style>