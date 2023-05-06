<template>
  <div class="problem">
    <div class="leftStyle">
      <a-tabs v-model:activeKey="tabKey" type="card">
        <a-tab-pane key="problem">
          <template #tab>
            <file-search-outlined style="margin-right: 0.5rem" />
            题目描述
          </template>

          <ProblemView
              :id="Number(params.pro_id)"
              style="height: 82vh; overflow-y: hidden; padding-left: 1rem"
          />
        </a-tab-pane>

        <a-tab-pane key="solution">
          <template #tab>
            <unordered-list-outlined style="margin-right: 0.5rem" />
            题解
          </template>
          <SolutionList
              v-if="tabKey === 'solution'"
              style="height: 82vh; overflow-y: auto"
          />
        </a-tab-pane>

        <a-tab-pane key="submission">
          <template #tab>
            <history-outlined style="margin-right: 0.5rem" />
            提交记录
          </template>

          <SubmissionList
              v-if="tabKey === 'submission'"
              style="overflow-y: auto; padding-left: 1rem"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="rightStyle" style="position: relative">
      <Submit @submit="handleSubmit" />
      <router-view
          style="position: absolute; top: 0; left: 0; right: 0; height: 92vh"
          :key="$route.fullPath"
      ></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import ProblemView from "@/components/Problem/LeftComponent/ProblemView.vue";
import Submit from "@/components/Problem/RightComponent/Submit.vue";
import SolutionList from "@/components/Problem/LeftComponent/questionSolutions.vue";
import SubmissionList from "@/components/Problem/LeftComponent/SubmissionList.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "Problem",
  components: { ProblemView, Submit, SolutionList, SubmissionList },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    // 获取路由参数
    const { query, params } = useRoute();
    // 菜单栏key
    const tabKey = ref("problem");

    // 监听题目提交
    const handleSubmit = (val: number) => {
      //TODO: Do Nothing
      console.log(val);
    };

    let modifyStyle = () => {
      let tabNav = document.getElementsByClassName(
          "ant-tabs-nav-wrap"
      )[0] as HTMLElement;
      tabNav.style.background = "#f7f7f7";
    };

    onMounted(() => {
      modifyStyle();
    });

    return {
      tabKey,
      query,
      params,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.problem {
  width: 100%;
  height: 93vh;
  background-color: #f7f7f7;
}

.leftStyle {
  width: 39.75%;
  height: 88vh;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 1rem;
  margin-right: 0.5%;
  overflow-y: hidden;
  background-color: #ffffff;
}

.rightStyle {
  width: 59.75%;
  height: 92vh;
  display: inline-block;
  overflow-y: auto;
  background-color: #ffffff;
}

.leftStyle > .ant-tabs-card .ant-tabs-nav {
  background: #f7f7f7;
}

.leftStyle > .ant-tabs-nav-wrap {
  background: #f7f7f7;
}

.leftStyle > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  /*padding-left: 1rem;*/
  /*padding-right: 1rem;*/
  background: #fff;
}

.leftStyle > .ant-tabs-card > .ant-tabs-nav::before {
  display: none;
}
</style>