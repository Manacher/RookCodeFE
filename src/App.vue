<template>
  <router-view/>
</template>


<script lang="ts">
import axios from "axios";
import {defineComponent, onMounted} from "vue";

export default defineComponent({
  setup() {

    onMounted(() => {
      console.log("axios test");
      axios.get("/").then((res) => {
        console.log("get resp:", res)
      })
    })
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
