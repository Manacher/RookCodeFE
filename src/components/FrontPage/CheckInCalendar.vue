<template>
  <VCalendar
      :attributes="attributes"
      title-position="right"
      class="checkin-calendar"
      :max-date="new Date()"
      :min-date="new Date('2023-03-25')"
      @dayclick="onDayClickHandler"
      @update:fromPage="onWeekClickHandler"
      locale="zh"
  >
<!--    locale="zh"-->
    <template #day-popover="{attributes }">
      <div>
        <ul>
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
import {DailyQuestionParam, getDailyQuestionList} from "@/components/FrontPage/frontPageHttp";
import {message} from "ant-design-vue";
import {CalendarListColumn, processCalendarListData} from "@/components/FrontPage/frontPageUtil";
import router from "@/router";
import {start} from "@popperjs/core";

export default defineComponent({
  setup() {

    let onDayClickHandler = (day: any) => {
      if (day2ID.get(day.id)) {
        router.push({path: '/problems/' + day2ID.get(day.id)})
      }
    }

    let onWeekClickHandler = (page: any) => {
      const date = new Date(page.year, page.month - 1);
      let today: Date = new Date();

      let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      if(today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth()) {
        endDate = new Date();
      }

      const startDateString = startDate.toISOString().substring(0, 10);
      const endDateString = endDate.toISOString().substring(0, 10);

      let params: DailyQuestionParam = {
        start_date: startDateString,
        end_date: endDateString
      }
      getCalendarData(params)
    }

    let getCalendarData = (params: DailyQuestionParam) => {
      getDailyQuestionList(params).then((res: any) => {
        let list = res.data.questionRespList
        let processRes = processCalendarListData(list)
        checkIns.value = processRes[0] as CalendarListColumn[]
        day2ID = processRes[1] as Map<string, number>
      })
    }

    const checkIns = ref<CalendarListColumn[]>([]);

    let day2ID = new Map<string, number>();

    const attributes = computed(() => [
      ...checkIns.value.map(checkIn => ({
        dates: checkIn.dates,
        dot: {
          color: checkIn.color,
          style: {
            width: '0.25rem',
            height: '0.25rem',
            marginBottom: '0.15rem',
          }
        },
        highlight: checkIn.highlight ? 'green' : '',

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
      onWeekClickHandler,
    };
  },
});
</script>

<style scoped>
.checkin-calendar {
  border: none;
  box-shadow: 0 2px 8px lightgrey;
}


</style>