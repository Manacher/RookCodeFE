<template>

  <VCalendar
      :attributes="attributes"
      title-position="right"
      @dayclick="onDayClickHandler"
  >
    <template #day-popover="{attributes }">
      <div>
        <ul >
          <li
              v-for="{ key, customData } in attributes"
              :key="key"
              style="margin-top: 0.7rem; padding-right: 1.5rem "
          >
            {{ customData }}
          </li>
        </ul>
      </div>
    </template>
  </VCalendar>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
export default defineComponent({
  setup() {

    let onDayClickHandler = (day: any) => {
      console.log("checkIn day clicked", day.id)
    }

    const checkIns = ref([
      {
        description: '2373. 矩阵中的最大局部值',
        dates: {weekdays: 6},
        color: 'orange',
      },
      {
        description: '2. 两数相加',
        dates: {weekdays: 7},
        color: 'green',
      },
    ]);

    const attributes = computed(() => [
      ...checkIns.value.map(checkIn => ({
        dates: checkIn.dates,
        dot: {
          color: checkIn.color,
        },
        popover: {
          visibility: 'hover',
        },
        customData: checkIn.description,
      })),
    ]);

    return {
      checkIns,
      attributes,
      onDayClickHandler,
    };
  },
});
</script>

<style scoped>

</style>