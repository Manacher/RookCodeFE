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
            <span style="float: left; color: #00af9b">简单</span>
            <div>
              <span class="static-solve-span">{{ easySolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ easyTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <span style="float: left; color: #ffb800">中等</span>
            <div>
              <span class="static-solve-span">{{ mediumSolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ mediumTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <span style="float: left; color: #ff2d55">困难</span>
            <div>
              <span class="static-solve-span">{{ hardSolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ hardTotal }}</span>
            </div>
          </a-col>

        </a-row>


      </div>


    </div>
  </div>


</template>

<script lang="ts">

import {ref} from "vue";

let easyTotal = ref(765);
let mediumTotal = ref(651);
let hardTotal = ref(1599);

let easySolved = ref(45);
let mediumSolved = ref(25);
let hardSolved = ref(91);

export default {
  name: "progress-display",
  setup() {
    return {
      easyTotal,
      mediumTotal,
      hardTotal,
      easySolved,
      mediumSolved,
      hardSolved,
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
  margin-right: 1rem;
}

.progress-statistics {
  flex: 1;
}

.static-solve-span {
  margin-top: 0.5rem;
  float: left;
  color: #5c5c5c;
}

.static-total-span {
  float: left;
  color: #c4c4c6;
}

.easy-sta .ant-statistic-title {
  color: #00af9b;
}

</style>