<template>
  <div class="leftStyle">
    <a-menu v-model:selectedKeys="menuKey" mode="horizontal" @select="handleMenuChange">
      <a-menu-item key="problem">
        题目描述
      </a-menu-item>
      <a-menu-item key="solution">
        题解
      </a-menu-item>
      <a-menu-item key="submission">
        提交记录
      </a-menu-item>
    </a-menu>
    <component :is="leftComp"></component>
  </div>
  <component class="rightStyle" :is="rightComp"></component>
</template>

<script lang="ts">
import {ref, shallowRef} from "vue";
import ProblemView from "@/components/ProblemView.vue";
import Submit from "@/components/Submit.vue";

export default {
  name: "Problem",
  components:{ProblemView, Submit},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){

    let leftComp = shallowRef(ProblemView);
    let rightComp = shallowRef(Submit);
    const menuKey = ref<string[]>(['problem']);

    // 题目描述、题解、提交详情切换
    const handleMenuChange = (response: any) => {
      if(response.key === "problem"){
        leftComp.value = ProblemView
      }
      else if(response.key === "solution"){
        console.log("solution")
      }
      else if(response.key === "submission"){
        console.log("submission")
      }
      else{
        console.log("unknown menu item")
      }
    }

    return {
      leftComp,
      rightComp,
      menuKey,
      handleMenuChange,
    }
  }
}
</script>

<style scoped>
  .leftStyle{
    display: inline-block;
    vertical-align: top;
    padding: 20px;
    max-height: 600px;
    overflow-y: auto;
    background: #ff0000;
  }
  .rightStyle{
    display: inline-block;
    padding: 20px;
    background: #42b983;
  }



</style>