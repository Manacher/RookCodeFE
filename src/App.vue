<template>

    <div id="main">
   <Register></Register>
    </div>

  <router-view/>
</template>


<script lang="ts">
import axios from "axios";
import {defineComponent, onMounted} from "vue";
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

export default defineComponent({
  name:'App',
  // eslint-disable-next-line vue/no-unused-components
  components: {Login,Register},


  setup() {

    /*onMounted(() => {
      console.log("axios test");
      axios.get("/").then((res) => {
        console.log("get resp:", res)
      })
    })*/
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
