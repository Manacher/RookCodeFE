<template>

  <router-link to="/login">登录</router-link>|
  <router-link to="/register">注册</router-link>
  <router-view/>
</template>


<script lang="ts">
import axios from "axios";
import {defineComponent, onMounted,computed} from "vue";
import Register from '@/views/Register.vue'
import Login from "@/views/Login.vue";
import request from "@/utils/request";
import store  from "@/store";

export default defineComponent({
  name:'App',
  // eslint-disable-next-line vue/no-unused-components
  components: {Register,Login},


  setup() {
    onMounted(() => {
      const token = store.state.token
      //token存在的话自动登录
      if(token) {
        store.dispatch('fetchCurrentUser')
      }


    })


    /*这里存疑*/
    const currentToken = computed(() => {
      return store.state.token
    })

    return{
      currentToken,
    }

  }
})

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
