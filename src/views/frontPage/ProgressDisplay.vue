<template>

  <div class="main-area">
    <div class="text-area">
      当前进度
    </div>

    <div class="progress-display">


      <div class="progress-chart">
        <a-tooltip title="简单">
          <a-progress :percent="statisticsData.easySolved / statisticsData.easyTotal * 100" size="small" strokeColor="#00af9b" :showInfo="false"/>
        </a-tooltip>

        <a-tooltip title="中等">
          <a-progress :percent="statisticsData.mediumSolved / statisticsData.mediumTotal * 100" size="small" strokeColor="#ffb800" :showInfo="false"/>
        </a-tooltip>

        <a-tooltip title="困难">
          <a-progress :percent="statisticsData.hardSolved / statisticsData.hardTotal * 100" size="small" strokeColor="#ff5064" :showInfo="false"/>
        </a-tooltip>

      </div>

      <div class="progress-statistics">

        <a-row :gutter="12">

          <a-col :span="8">
            <span class="dif-text" style="color: #00af9b">简单</span>
            <div>
              <span class="static-solve-span">{{ statisticsData.easySolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ statisticsData.easyTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <div>
              <span class="dif-text" style="color: #ffb800">中等</span>
            </div>

            <div>
              <span class="static-solve-span">{{ statisticsData.mediumSolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ statisticsData.mediumTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <span class="dif-text" style="color: #ff2d55">困难</span>
            <div>
              <span class="static-solve-span">{{ statisticsData.hardSolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ statisticsData.hardTotal }}</span>
            </div>
          </a-col>

        </a-row>


      </div>


    </div>
  </div>


</template>

<script lang="ts">

import {getFrontPageProgressData} from "@/views/frontPage/frontPageHttp";
import {ref} from "vue";
import {message} from "ant-design-vue";

export default {
  name: "progress-display",
  setup(){

    let statisticsData = ref({
      easyTotal: 0,
      mediumTotal: 0,
      hardTotal: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0
    })

    getFrontPageProgressData().then( (res : any) => {

      if(res.success){
        let data = res.data
        statisticsData.value.easyTotal = data.easy_total
        statisticsData.value.mediumTotal = data.medium_total
        statisticsData.value.hardTotal = data.hard_total
        statisticsData.value.easySolved = data.easy_solved
        statisticsData.value.mediumSolved = data.medium_solved
        statisticsData.value.hardSolved = data.hard_solved
      }else{
        message.error(res.message)
      }

    })

    return{
      statisticsData
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
  font-family: 微软雅黑;
}

.text-area {
  position: absolute;
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: bold;
  top: 0.6rem;

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