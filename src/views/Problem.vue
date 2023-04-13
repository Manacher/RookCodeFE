<template>
  <div class="problem">
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
    <component class="rightStyle" :is="rightComp" @submit="handleSubmit"></component>
  </div>
</template>

<script lang="ts">
import {ref, shallowRef} from "vue";
import ProblemView from "@/components/ProblemView.vue";
import Submit from "@/components/Submit.vue";
import SolutionList from "@/components/SolutionList.vue";
import SubmissionList from "@/components/SubmissionList.vue";

export default {
  name: "Problem",
  components:{ProblemView, Submit, SolutionList,SubmissionList},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(){

    let leftComp = shallowRef('ProblemView');
    let rightComp = shallowRef('Submit');
    const menuKey = ref<string[]>(['problem']);

    // 题目描述、题解、提交详情切换
    const handleMenuChange = (response: any) => {
      if(response.key === "problem"){
        leftComp.value = 'ProblemView'
      }
      else if(response.key === "solution"){
        leftComp.value = 'SolutionList'
      }
      else if(response.key === "submission"){
        leftComp.value = 'SubmissionList'
      }
      else{
        console.log("unknown menu item")
      }
    }

    // 监听题目提交
    const handleSubmit = (val: number) => {
      //TODO
      console.log(val)
    }

    return {
      leftComp,
      rightComp,
      menuKey,
      handleMenuChange,
      handleSubmit,
    }
  }
}
</script>

<style scoped>
  .problem{
    width: 1rem;
  }
  .leftStyle{
    display: inline-block;
    vertical-align: top;
    padding: 0;
    /*max-height: 1rem;*/
    overflow-y: auto;
    background: #ff0000;
  }
  .rightStyle{
    display: inline-block;
    padding: 0;
    background: #42b983;
  }



</style>