<template>
  <div class="problem">
    <div class="leftStyle">

      <a-tabs v-model:activeKey="tabKey" >
        <a-tab-pane key="problem" tab="题目描述">
          <ProblemView :id="Number(params.pro_id)"/>
        </a-tab-pane>

        <a-tab-pane key="solution" tab="题解" :affix="true">
          <SolutionList v-if="tabKey==='solution'"/>
        </a-tab-pane>

        <a-tab-pane key="submission" tab="提交记录">
          <SubmissionList v-if="tabKey==='submission'"/>
        </a-tab-pane>

      </a-tabs>
    </div>
    <div class="rightStyle" style="position:relative">
      <Submit @submit="handleSubmit"/>
      <router-view style="position:absolute; top: 2rem; left: 2rem; right: 2rem;" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, shallowRef} from "vue";
import ProblemView from "@/components/Problem/LeftComponent/ProblemView.vue";
import Submit from "@/components/Problem/RightComponent/Submit.vue";
import SolutionList from "@/components/Problem/LeftComponent/questionSolutions.vue"
import SubmissionList from "@/components/Problem/LeftComponent/SubmissionList.vue";
import {useRoute} from 'vue-router';

export default {
  name: "Problem",
  components: {ProblemView, Submit, SolutionList, SubmissionList},
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    // 获取路由参数
    const {query, params} = useRoute()
    // 菜单栏key
    const tabKey = ref('problem');


    // 监听题目提交
    const handleSubmit = (val: number) => {
      //TODO: Do Nothing
      console.log(val)
      // tabKey.value = 'submission'
    }

    const containerRef = ref();

    return {
      tabKey,
      query,
      params,
      handleSubmit,


      containerRef,
    }
  }
}
</script>

<style scoped>
.problem {
  width: 100%;
  height: 50rem;
}

.leftStyle {
  width: 40%;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  padding: 2rem;
  /*max-height: 1rem;*/
  overflow-y: auto;
}

.rightStyle {
  width: 60%;
  height: 100%;
  display: inline-block;
  padding: 2rem;
  overflow-y: auto;
}

</style>