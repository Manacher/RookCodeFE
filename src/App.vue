<template>
  <rook-header v-if="ok"></rook-header>
  <router-view/>
  <rook-footer v-if="ok"></rook-footer>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import RookHeader from "@/components/rook-header.vue";
import RookFooter from "@/components/rook-footer.vue";
import store from "@/store";

export default defineComponent({
  name: 'app',
  components:{
    RookHeader,
    RookFooter,
  },
  setup() {
    let ok=ref(true)
    onMounted(()=>{
      if(store.state.token===''){
        ok.value=false
      }

    })
    watch(store.state, (newVal, oldVal)=> {
      ok.value=true
    })
    return{
      ok
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
