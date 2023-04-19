<template>
  <VCalendar color="sky-blue" :attributes="attrs" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    let attrs = ref([
      {
        highlight: true,
        dates: new Date(),
      },
    ]);
    return {
      attrs,
    };
  },
});
</script>

<style scoped>

</style>