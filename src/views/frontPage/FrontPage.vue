<template>
  <a-layout class="front-page-main-area">

    <a-layout-content class="layout-content">

      <a-row>

        <a-col :span="18">
          <FrontBanner/>
          <ProblemList style="margin-top: 1rem"/>
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

.front-page-main-area{
  min-width: 88rem;
  /*106.5*/
}

.layout-content {
  padding: 2rem 10rem 0 10rem;
}

.right-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;
}

@media screen and (min-width: 101rem) and (max-width: 105rem) {
  .layout-content {
    padding: 2rem 6rem 0 6rem;
  }
}

@media screen and (min-width: 99rem) and (max-width: 101rem) {
  .layout-content {
    padding: 2rem 5rem 0 5rem;
  }
}

@media screen and (min-width: 97rem) and (max-width: 99rem) {
  .layout-content {
    padding: 2rem 4rem 0 4rem;
  }
}

@media screen and (min-width: 95rem) and (max-width: 97rem) {
  .layout-content {
    padding: 2rem 3rem 0 3rem;
  }
}

@media screen and (min-width: 93rem) and (max-width: 95rem) {
  .layout-content {
    padding: 2rem 2rem 0 2rem;
  }
}

@media screen and (min-width: 91rem) and (max-width: 93rem) {
  .layout-content {
    padding: 2rem 1rem 0 1rem;
  }
}

/*@media screen and (min-width: 89rem) and (max-width: 91rem) {*/
/*  .layout-content {*/
/*    padding: 2rem 2rem 0 2rem;*/
/*  }*/
/*}*/

@media screen and (max-width: 91rem) {
  .layout-content {
    padding: 2rem 0 0 0;
  }
}


</style>