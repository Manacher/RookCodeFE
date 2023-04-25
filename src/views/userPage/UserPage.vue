<template>

  <a-layout class="main-area">

    <div class="user-info">
      <UserInfoCard/>
    </div>

    <a-layout-content class="content-area">

      <a-row :gutter="12">

        <a-col flex="16rem">
          <UserInfoDetail style="width:100%"/>
        </a-col>

        <a-col flex="auto">
          <a-layout-content>
            <a-row :gutter="12">

              <a-col flex="26rem">
                <UserStatistics :value="statisticsData" style="height: 11rem"/>
              </a-col>

              <a-col flex="auto">
                <UserHeatMap style="height: 11rem"/>
              </a-col>

            </a-row>


          </a-layout-content>
          <a-row class="content-bottom">
            <a-col flex="0"/>
            <a-col flex="auto">
              <UserList/>
            </a-col>
          </a-row>
        </a-col>

      </a-row>


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
import UserInfoDetail from "@/views/userPage/UserInfoDetail.vue";

export default defineComponent({
  components: {
    UserInfoDetail,
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

    console.log(window.innerWidth)

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
  width: 99vw;
  min-width: 85rem;
}

@media screen and (min-width: 101rem) and (max-width: 105rem) {
  .main-area {
    padding: 2rem 8rem 0 8rem;
  }
}

@media screen and (min-width: 97rem) and (max-width: 101rem) {
  .main-area {
    padding: 2rem 5rem 0 5rem;
  }
}

@media screen and (min-width: 93rem) and (max-width: 97rem) {
  .main-area {
    padding: 2rem 4rem 0 4rem;
  }
}

@media screen and (min-width: 89rem) and (max-width: 93rem) {
  .main-area {
    padding: 2rem 2rem 0 2rem;
  }
}

@media screen and (max-width: 89rem) {
  .main-area {
    padding: 2rem 0 0 0;
  }
}



.user-info {

}

.content-area {
  margin-top: 1.5rem;
}


.content-bottom {
  margin-top: 1rem;
}


</style>