<template>
  <a-layout class="layout">


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
import FrontBanner from "@/views/frontpage/FrontBanner.vue";
import ProblemList from "@/views/frontpage/ProblemList.vue";
import ProgressDisplay from "@/views/frontpage/ProgressDisplay.vue";
import CheckInCalendar from "@/views/frontpage/CheckInCalendar.vue";


export default defineComponent({
  components: {
    FrontBanner,
    ProblemList,
    ProgressDisplay,
    CheckInCalendar,
  },

  setup() {

    let statisticsData = ref({
      easyTotal: 765,
      mediumTotal: 651,
      hardTotal: 1599,
      easySolved: 45,
      mediumSolved: 25,
      hardSolved: 91
    })

    return {
      statisticsData
    };
  },
});
</script>
<style>

.layout {
  /*background-color: white;*/
}

.layout-content {
  padding: 2rem 4rem 0 4rem
}

.right-side {

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;
}

</style>