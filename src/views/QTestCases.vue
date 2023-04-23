<template>
  <a-layout class="qtestcases-main-box">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1">
        <template #tab>
        <span>
          <edit-outlined />
          上传测试用例
        </span>
        </template>
        <QTestCasesUp></QTestCasesUp>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
        <span>
          <highlight-outlined />
          查看测试用例
        </span>
        </template>
        <QTestCasesEd></QTestCasesEd>
      </a-tab-pane>
    </a-tabs>
  </a-layout>

</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import QTestCasesUp from "@/components/QTestCases/QTestCasesUp.vue";
import QTestCasesEd from "@/components/QTestCases/QTestCasesEd.vue";

export default defineComponent({
  components: {
    QTestCasesUp,
    QTestCasesEd
  },
  setup() {
    return {
      activeKey: ref('1'),
    };
  },
});
</script>

<style>
.qtestcases-main-box{

  padding-left: 1rem;
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px #999;
}



</style>