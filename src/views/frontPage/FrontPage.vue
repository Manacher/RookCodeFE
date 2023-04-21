<template>
  <a-layout>

    <a-layout-content class="layout-content">

      <a-row>

        <a-col :span="18">
          <FrontBanner/>
          <ProblemList style="margin-top: 3rem"/>
        </a-col>

        <a-col :span="6">
          <div class="right-side">
            <ProgressDisplay style="width: 20rem" :value="statisticsData"/>
            <CheckInCalendar style="width: 20rem; margin-top: 2rem"/>
          </div>

        </a-col>

      </a-row>

    </a-layout-content>


  </a-layout>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import FrontBanner from "@/views/frontPage/FrontBanner.vue";
import ProblemList from "@/views/frontPage/ProblemList.vue";
import ProgressDisplay from "@/views/frontPage/ProgressDisplay.vue";
import CheckInCalendar from "@/views/frontPage/CheckInCalendar.vue";

export default defineComponent({
  components: {
    FrontBanner,
    ProblemList,
    ProgressDisplay,
    CheckInCalendar,
  },

  setup() {
    let statisticsData = ref({
      easyTotal: 200,
      mediumTotal: 150,
      hardTotal: 100,
      easySolved: 45,
      mediumSolved: 25,
      hardSolved: 31
    })

    return {
      statisticsData
    };
  },
});
</script>
<style scoped>


.layout-content {
  padding: 2rem 10rem 0 10rem;
}

.right-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;
}

</style>