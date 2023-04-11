<template>
  <a-layout class="layout">



    <a-layout-content class="layout-content">

      <a-row>

        <a-col :span="18" >
          <div :style="{ background: 'lightgrey', minHeight: '880px' }">left</div>
        </a-col>

        <a-col :span="6">
          <div :style="{ background: '#d4e4ff', minHeight: '280px' }">right</div>
        </a-col>

      </a-row>


    </a-layout-content>




  </a-layout>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  setup() {
    return {

    };
  },
});
</script>
<style>


.layout-content{
  padding: 2rem 4rem 0 4rem
}

</style>