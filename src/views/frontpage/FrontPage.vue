<template>
  <a-layout class="layout">



    <a-layout-content class="layout-content">

      <a-row>

        <a-col :span="18" >
          <FrontBanner/>
          <ProblemList/>
        </a-col>

        <a-col :span="6">
          <ProgressChart/>
        </a-col>
      </a-row>

    </a-layout-content>




  </a-layout>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import FrontBanner from "@/views/frontpage/FrontBanner.vue";
import ProblemList from "@/views/frontpage/ProblemList.vue";
import ProgressChart from "@/views/frontpage/ProgressChart.vue";

export default defineComponent({
  components:{
    FrontBanner,
    ProblemList,
    ProgressChart,
  },
  setup() {
    return {

    };
  },
});
</script>
<style>

.layout{
  /*background-color: white;*/
}

.layout-content{
  padding: 2rem 4rem 0 4rem
}

</style>