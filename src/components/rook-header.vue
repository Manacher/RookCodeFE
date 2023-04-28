<template>
  <div class="header">

    <div class="logo">
        <span>
             RookCode
        </span>
    </div>

    <div class="right-item">
      <div>
        <a-avatar :size="32"
                  :src=userInfo.avatar
                  @click="onCenterClicked"
                  id="center-avatar"/>

        <transition name='fade'>

          <a-card hoverable class="center-card" v-show="cardShow" id="center-card">

            <a-card-meta  :title=userInfo.nickname :description=userInfo.account class="center-card-header">
              <template #avatar>
                <a-avatar :size="40"
                          :src=userInfo.avatar
                />
              </template>
            </a-card-meta>

            <template #actions>

              <div class="center-card-action-item">

                <router-link :to="`/user/${userInfo.account}`" v-on:click="onCardClicked">
                  <img src="../assets/center.png" class="center-card-item-img"/>
                  <span>主页</span>
                </router-link>
              </div>

              <div>
                <a-popconfirm title="确认退出登陆吗？" ok-text="是" cancel-text="否">

                  <a href="#" style="margin-right: 1rem">
                    <img src="../assets/exit.png"
                         style="height: 1rem; width: 1rem; margin-bottom: 0.2rem; margin-right: 0.3rem"/>
                    <span>退出</span>
                  </a>
                </a-popconfirm>
              </div>
            </template>

          </a-card>

        </transition>
      </div>
    </div>

    <a-menu
        v-model:selectedKeys="navKeys"
        mode="horizontal"
        class="menu"
        style="padding-top: 0.5rem;"
    >
      <a-menu-item key="/" style="padding-bottom: 0.5rem">
        <router-link to="/">首页</router-link>
      </a-menu-item>

      <a-menu-item key="/discussion">
        <router-link to="/discussion">讨论</router-link>
      </a-menu-item>
    </a-menu>

  </div>

  <div class="header-placeholder">

  </div>


</template>

<script lang="ts">

import {onMounted, ref} from "vue";
import store, {UserInfo} from "@/store";
import axios from "axios";
import {message} from "ant-design-vue";


export default {
  name: "rook-header",
  setup() {

    // todo 奇怪的bug，account必须初始化了才能成功
    let userInfo = ref({
      account: "account",
      nickname: "",
      avatar: "",
    })

    let getInfo = () => {
      axios({
        method: 'get',
        url: '/header',
        headers: {
          'Authorization': store.state.token,
        },
      }).then((res)=>{
        let data = res.data;
        if(data.success){
          data = data.data;
          userInfo.value.nickname = data.nickname;
          userInfo.value.avatar = data.avatar;
          userInfo.value.account = data.account;

          console.log("userInfo: ", userInfo.value)
        }else{
          message.error("网页Header请求出错")
        }
      })
    }

    // TODO 手动设置登陆token
    // let info:UserInfo = {
    //   account: "1426887306@qq.com",
    //   token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNDI2ODg3MzA2QHFxLmNvbSIsImNyZWF0ZWQiOjE2ODIyNDcwMTA0MDYsImV4cCI6MTcxODI0NzAxMH0.LmY3hcywCho3RVjPrfQkSx4ofSI-broMbfDU5eCXgVPctACsfEOA1n4NnYr64cquu9dx6Y9iVWPSUPlFSal6vA"
    // }
    // store.commit("login",info);
    // console.log("account and token", store.state.token, store.state.account)

    let currentPath = window.location.pathname;
    let navKeys = ref(['/']);
    navKeys.value = [currentPath]

    let cardShow = ref(false);
    let centerCard: any;

    // dom元素加载完毕后获取节点
    onMounted(() => {
      centerCard = document.querySelector('#center-card')
      // 设置card样式
      let cardDetail = document.querySelector('.ant-card-meta-detail') as HTMLElement
      cardDetail.style.paddingLeft = '0.5rem'
      getInfo();
    })

    // 个人头像点击事件，当卡片未显示时，点击头像让卡片出现，并添加鼠标监听事件
    let onCenterClicked = () => {
      if (!cardShow.value) {
        cardShow.value = true;
        setTimeout(() => {
          document.addEventListener('click', watchNextClick)
        }, 100)
      }
    }

    // 监听点开个人中心卡片后的下一次点击事件，若点击的不是个人中心卡片内容则令卡片消失，并移除监听事件
    let watchNextClick = (e: any) => {
      if (centerCard) {

        if (!centerCard.contains(e.target)) {
          // todo 该逻辑之后可完善，即点击弹出卡片的非是、否区域也会直接令卡片消失的问题
          // let popCard = document.querySelector('.ant-popover-inner-content')
          // if(popCard && popCard.contains(e.target)){
          //   return
          // }
          cardShow.value = false;
          document.removeEventListener('click', watchNextClick)
        }
      }
    }

    let onCardClicked = () => {
      document.removeEventListener('click', watchNextClick)
      cardShow.value = false;
      navKeys.value = ['/user/' + userInfo.value.account]
    }

    return {
      navKeys,
      cardShow,
      userInfo,
      onCenterClicked,
      onCardClicked,
    }
  }
}
</script>

<style scoped>

.header {
  background-color: white;
  caret-color: rgba(0, 0, 0, 0);
  user-select: none;
  font-size: 1rem;
  /*padding-top: 1rem;*/
  /*margin-bottom: 1rem;*/
  z-index: 1;
}

.menu {
  lineHeight: 4rem;
  font-size: 1.2rem;
  color: #5c5c5c;
}

.logo {
  color: #262626;
  float: left;
  margin-left: 10rem;
  margin-right: 1rem;
  margin-top: 0.7rem;
  font-style: italic;
  font-size: 1.5rem;
  font-weight: bold;
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(1rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.center-card {
  position: absolute;
  z-index: 1;
  width: 19rem;
  right: 1rem;
  top: 4.2rem;
  border-radius: 15px;
  padding-bottom: 0.7rem;
  animation: slide-up 0.3s;
  cursor: default;
  text-align: left;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.center-card-header {
  font-size: 0.8rem;
}

.right-item {
  position: absolute;
  top: 1rem;
  right: 9.5rem;
  width: 3rem;
  height: 3rem;
}


.center-card-action-item img {
  vertical-align: middle;
  margin-right: 0.3rem;
  height: 1rem;
  width: 1rem;
}


.center-card-action-item span {
  vertical-align: middle;
}

.header-placeholder {
  height: 0.1rem;
  width: 100%;
  background-color: #f0f0f0;
}

@media screen and (min-width: 105rem) and (max-width: 106rem) {
  .logo {
    margin-left: 9rem;
  }
  .right-item {
    right: 9.5rem;
  }
}

@media screen and (min-width: 101rem) and (max-width: 105rem) {
  .logo {
    margin-left: 7rem;
  }
  .right-item {
    right: 7.5rem;
  }
}

@media screen and (min-width: 97rem) and (max-width: 101rem) {
  .logo {
    margin-left: 5rem;
  }
  .right-item {
    right: 5.5rem;
  }
}

@media screen and (min-width: 93rem) and (max-width: 97rem) {
  .logo {
    margin-left: 3rem;
  }
  .right-item {
    right: 3.5rem;
  }
}

@media screen and (min-width: 89rem) and (max-width: 93rem) {
  .logo {
    margin-left: 1rem;
  }
  .right-item {
    right: 1.5rem;
  }
}

@media screen and (max-width: 89rem) {
  .logo {
    margin-left: 0rem;
  }
  .right-item {
    right: 0;
  }
}


</style>