<template>

  <a-layout class="main-area">

    <div class="user-info" style="width: 20rem; height: 6rem; background-color: lightslategrey;">
      <UserInfoCard/>
    </div>

    <a-layout-content class="content-area">

      <div class="content-top">

        <div class="statistics">
          <UserStatistics :value="statisticsData"/>
        </div>

        <div class="heatmap">
          <UserHeatMap/>
        </div>

<!--        <a-row>-->
<!--          <a-col class="gutter-row" :span="9">-->
<!--            <div style="width: 100%; height: 12rem; margin-right: 1rem">-->
<!--              <UserStatistics :value="statisticsData"/>-->
<!--            </div>-->
<!--          </a-col>-->
<!--          <a-col class="gutter-row" :span="15">-->
<!--            <div style="width: 100%; height: 12rem; background-color: lightblue">-->
<!--              <UserHeatMap/>-->
<!--            </div>-->
<!--          </a-col>-->
<!--        </a-row>-->

      </div>

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
      easySolved: 45,
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

.content-top{
  display: flex;
  flex-direction: row;
}

.statistics{
  margin-right: 1rem;
}

.heatmap{
  flex: 1;
  background-color: lightblue;
}

.content-bottom{
  width: 100%;
  height: 30rem;
  margin-top: 1rem;
  background-color: lightseagreen;
}


</style>