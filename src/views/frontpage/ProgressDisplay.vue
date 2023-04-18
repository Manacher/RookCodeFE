<template>

  <div class="main-area">
    <div class="text-area">
      当前进度
    </div>

    <div class="progress-display">

      <div class="progress-chart">
        <a-tooltip title="简单">
          <a-progress :percent="30" size="small" strokeColor="#00af9b" :showInfo="false"/>
        </a-tooltip>

        <a-tooltip title="中等">
          <a-progress :percent="20" size="small" strokeColor="#ffb800" :showInfo="false"/>
        </a-tooltip>

        <a-tooltip title="困难">
          <a-progress :percent="10" size="small" strokeColor="#ff5064" :showInfo="false"/>
        </a-tooltip>

      </div>

      <div class="progress-statistics">

        <a-row :gutter="12">

          <a-col :span="8">
            <span class="dif-text" style="color: #00af9b">简单</span>
            <div>
              <span class="static-solve-span">{{ value.easySolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ value.easyTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <div>
              <span class="dif-text" style="color: #ffb800">中等</span>
            </div>

            <div>
              <span class="static-solve-span">{{ value.mediumSolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ value.mediumTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <span class="dif-text" style="color: #ff2d55">困难</span>
            <div>
              <span class="static-solve-span">{{ value.hardSolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ value.hardTotal }}</span>
            </div>
          </a-col>

        </a-row>


      </div>


    </div>
  </div>


</template>

<script lang="ts">

import {ref, defineProps} from "vue";

let easyTotal = ref(75);
let mediumTotal = ref(61);
let hardTotal = ref(19);
let easySolved = ref(0);
let mediumSolved = ref(0);
let hardSolved = ref(0);

interface itf{
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export default {
  props:['value'],
  name: "progress-display",
  setup() {
    return {

    }
  }
}
</script>

<style scoped>

.main-area {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px lightgrey;
}

.text-area {
  position: absolute;
}

.progress-display {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
}

.progress-chart {
  width: 8rem;
  margin-right: 1.5rem;
}

.progress-statistics {
  flex: 1;
}

.static-solve-span {
  margin-top: 0.5rem;
  float: left;
  color: #5c5c5c;
  display: block
}

.static-total-span {
  float: left;
  color: #c4c4c6;
  display: block
}

.dif-text{
  float: left;
  padding-right: 0.5rem
}

.easy-sta .ant-statistic-title {
  color: #00af9b;
}

</style>