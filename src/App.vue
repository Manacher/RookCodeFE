<template>

<!--  <div id="nav">-->
<!--    <router-link to="/">Home</router-link>-->
<!--    |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </div>-->
<!--  <a-button type="primary">Primary Button</a-button>-->
  <router-view/>
</template>


<script lang="ts">
import axios from "axios";
import {defineComponent, onMounted} from "vue";
import store from "@/store";

export default defineComponent({
  setup() {

    onMounted(() => {
      console.log("axios test");
      axios.get("/").then((res) => {
        console.log("get resp:", res)
      })
    })

    const userInfo={
      token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjI0MzA5MzIxQHFxLmNvbSIsImNyZWF0ZWQiOjE2ODIxNzc2OTI0MzIsImV4cCI6MTY4MjIxMzY5Mn0.hbkyZW-iIjSh5c6Jeb7X4mWq6lnRnvPwLPvS9WbAZbm6GohC8AjE4a5IeVnC4u0oAbRk-Ot4bgOV7be95R4Scw",
      id: 28
    }
    //±£´ætoken
    store.commit("login",userInfo);

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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
