<template>

  <a-layout class="main-area">

    <div class="user-info" style="width: 20rem; height: 6rem; background-color: lightslategrey;">
      <UserInfoCard/>
    </div>

    <a-layout-content class="content-area">

      <a-row :gutter="12">
        <a-col >
            <UserStatistics :value="statisticsData" style="height: 20vh"/>
        </a-col>

        <a-col >
            <UserHeatMap style="height: 20vh"/>
        </a-col>

      </a-row>




<!--      <div class="content-top">-->

<!--        <div class="statistics">-->
<!--          <UserStatistics :value="statisticsData"/>-->
<!--        </div>-->

<!--        <div class="heatmap">-->
<!--          <UserHeatMap/>-->
<!--        </div>-->
<!--      </div>-->

      <div class="content-bottom">
        <UserList/>
      </div>

    </a-layout-content>
  </a-layout>


</template>

<script lang="ts">

import {defineComponent, ref} from "vue";
import router from "@/router";

import UserInfoCard from './UserInfoCard.vue'
import UserStatistics from './UserStatistics.vue'
import UserHeatMap from './UserHeatMap.vue'
import UserList from './UserList.vue'

export default defineComponent({
  components: {
    UserInfoCard,
    UserStatistics,
    UserHeatMap,
    UserList
  },

  setup() {


    let isSelfPage = () => {
      return router.currentRoute.value.params.id === ''
    }

    let statisticsData = ref({
      easyTotal: 765,
      mediumTotal: 651,
      hardTotal: 1599,
      easySolved: 43,
      mediumSolved: 25,
      hardSolved: 91
    })

    return {
      isSelfPage,
      statisticsData,
    };
  },
});


</script>

<style scoped>

.main-area {
  padding: 2rem 10rem 0 10rem;
  width: 100vw;
}

.user-info {

}

.content-area {
  margin-top: 1rem;
}


.content-bottom{
  width: 100%;
  height: 30rem;
  margin-top: 1rem;
  background-color: lightseagreen;
}


</style>