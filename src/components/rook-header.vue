<template>
  <a-layout-header class="header">

    <div class="logo">
        <span>
             RookCode
        </span>
    </div>

    <a-menu
        v-model:selectedKeys="navKeys"
        mode="horizontal"
        class="menu"
    >
      <a-menu-item key="/">
        <router-link to="/">题库</router-link>
      </a-menu-item>

      <a-menu-item key="discussion">
        <router-link to="/">讨论</router-link>
      </a-menu-item>

      <a-menu-item style="margin-left: auto">
        <div>
          <a-avatar :size="32"
                    src="https://assets.leetcode.cn/aliyun-lc-upload/users/elated-villaniw8c/avatar_1645749344.png"
                    @click="onCenterClicked"
                    id="center-avatar"/>

          <transition name='fade'>

            <a-card hoverable class="center-card" v-show="cardShow" id="center-card">

              <a-card-meta title="AgarthaSF" description="1426887306@qq.com" class="center-card-header">
                <template #avatar>
                  <a-avatar :size="32"
                            src="https://assets.leetcode.cn/aliyun-lc-upload/users/elated-villaniw8c/avatar_1645749344.png"/>
                </template>
              </a-card-meta>

              <template #actions id="center-card-action">

                <div>
                  <a href="/home" style="color:inherit">
                    <img src="../assets/center.png" class="center-card-item-img"/>
                    主页
                  </a>
                </div>

                <div>
                  <a href="/setting" style="color:inherit">
                    <img src="../assets/setting.png" class="center-card-item-img"/>
                    设置
                  </a>
                </div>

                <div>
                  <a-popconfirm title="确认退出登陆吗？" ok-text="是" cancel-text="否">
                    <a href="#" style="margin-right: 1rem">
                      <img src="../assets/exit.png" style="height: 1rem; width: 1rem; margin-bottom: 0.2rem"/>
                      退出
                    </a>
                  </a-popconfirm>
                </div>
              </template>

            </a-card>

          </transition>
        </div>

      </a-menu-item>

    </a-menu>
  </a-layout-header>


</template>

<script lang="ts">

import {onMounted, ref} from "vue";


export default {
  name: "rook-header",
  setup() {
    let navKeys = ref(['/']);
    let cardShow = ref(false);
    let centerCard: any;

    // dom元素加载完毕后获取节点
    onMounted(() => {
      centerCard = document.querySelector('#center-card')
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
        console.log(e.target)
        if (!centerCard.contains(e.target)) {
          cardShow.value = false;
          document.removeEventListener('click', watchNextClick)
        }
      }
    }

    return {
      navKeys,
      cardShow,
      onCenterClicked,
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
  z-index: 1;
}

.menu {
  lineHeight: 4rem;
  font-size: 1.2rem;
  color: #5c5c5c;
}

.logo {
  float: left;
  margin-left: 2rem;
  margin-right: 1rem;
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
  top: 5rem;
  border-radius: 15px;
  padding-bottom: 0.7rem;
  animation: slide-up 0.3s;
  cursor: default;
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

.center-card-item-img {
  height: 1rem;
  width: 1rem;
}
</style>