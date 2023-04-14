<template>
  <div class="progress-display">

    <div class="progress-chart">
      <a-tooltip title="全部">
        <a-progress :percent="50" size="small" :showInfo="false"/>
      </a-tooltip>

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

      <div style="background: #ececec">
        <a-row :gutter="8">

          <a-col :span="8">
            简单
            <div>
              {{easySolved}}
              <a-divider style="margin:0px" />
              {{easyTotal}}
            </div>
          </a-col>

          <a-col :span="8">
            中等
            <div>
              {{mediumSolved}}
              <a-divider style="margin:0px" />
              {{mediumTotal}}
            </div>
          </a-col>

          <a-col :span="8">
            困难
            <div>
              {{hardSolved}}
              <a-divider style="margin:0px" />
              {{hardTotal}}
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
  setup(){
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

.progress-display {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
}

.progress-chart {
  width: 8rem;
  padding: 1rem;

}

.progress-statistics {
  flex: 1;
}

.easy-sta .ant-statistic-title{
  color: #00af9b;
}

</style>