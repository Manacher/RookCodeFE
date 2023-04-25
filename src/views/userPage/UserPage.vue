<template>

  <a-layout class="main-area">

    <div class="user-info">
      <UserInfoCard :cardInfo="cardInfo"/>
    </div>

    <a-layout-content class="content-area">

      <a-row :gutter="12">

        <a-col flex="16rem">
          <UserInfoDetail :detailInfo="detailInfo" style="width:100%"/>
        </a-col>

        <a-col flex="auto">
          <a-layout-content>
            <a-row :gutter="12">

              <a-col flex="26rem">
                <UserStatistics :account="userAccount" style="height: 11rem"/>
              </a-col>

              <a-col flex="auto">
                <UserHeatMap :account="userAccount" style="height: 11rem"/>
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
import {getUserPageDetail} from "@/views/userPage/userPageHttp";
import {message} from "ant-design-vue";

export default defineComponent({
  components: {
    UserInfoDetail,
    UserInfoCard,
    UserStatistics,
    UserHeatMap,
    UserList
  },

  setup() {

    let userAccount = ref("")
    userAccount.value = router.currentRoute.value.params.id as string

    let isSelf = ref(false)

    let cardInfo = ref({
      avatar: "",
      nickname: "",
      account: "",
      isLoading: true,
    })

    let detailInfo = ref({
      avatar: "",
      nickname: "",
      account: "",
      description: "",
      view: 0,
      like: 0,
      langs: [],
      isSelf: false,
      isLoading: true,
    })


    getUserPageDetail(userAccount.value).then((res: any) => {

      if (res.success) {
        console.log("user page detail", res)
        let data = res.data
        isSelf.value = data.is_self

        cardInfo.value.nickname = data.nickname
        cardInfo.value.account = data.account
        cardInfo.value.avatar = data.avatar
        cardInfo.value.isLoading = false;

        detailInfo.value.nickname = data.nickname
        detailInfo.value.account = data.account
        detailInfo.value.avatar = data.avatar
        detailInfo.value.description = data.description
        detailInfo.value.view = data.view
        detailInfo.value.like = data.like
        detailInfo.value.langs = data.langs
        detailInfo.value.isSelf = data._self;
        detailInfo.value.isLoading = false;

      } else {
        message.error(res.message)
      }
    })

    return {
      isSelf,
      userAccount,
      cardInfo,
      detailInfo,
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