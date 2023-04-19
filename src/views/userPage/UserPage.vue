<template>

  <a-layout class="main-area">

    <div class="user-info" style="width: 20rem; height: 6rem; background-color: lightslategrey;">
      <UserInfoCard/>
    </div>

    <a-layout-content class="content-area">

      <div class="content-top">
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="8">
            <div style="width: 100%; height: 12rem; background-color: #42b983; margin-right: 1rem">
              <UserStatistics/>
            </div>
          </a-col>
          <a-col class="gutter-row" :span="16">
            <div style="width: 100%; height: 12rem; background-color: lightblue">
              <UserHeatMap/>
            </div>
          </a-col>
        </a-row>
      </div>


      <div class="content-bottom">
        <UserList/>
      </div>

    </a-layout-content>
  </a-layout>


</template>

<script lang="ts">

import {defineComponent} from "vue";
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


    return {
      isSelfPage,
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