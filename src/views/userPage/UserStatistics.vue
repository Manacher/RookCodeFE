<template>

  <div class="user-statistics">
    <div class="text-area">
      解题数量
    </div>

    <div id="echarts-container" />

    <div class="progress-display">
      <div class="progress-line-chart">
        <a-tooltip title="简单">
          <a-progress :percent="value.easySolved / value.easyTotal * 100"
                      size="large"
                      strokeColor="#00af9b"
                      :showInfo="false"
                      style="padding-bottom: 0.8rem"/>
        </a-tooltip>

        <a-tooltip title="中等">
          <a-progress :percent="value.mediumSolved / value.mediumTotal * 100"
                      size="large"
                      strokeColor="#ffb800"
                      :showInfo="false"
                      style="padding-bottom: 0.8rem"/>
        </a-tooltip>

        <a-tooltip title="困难">
          <a-progress :percent="value.hardSolved / value.hardTotal * 100"
                      size="large"
                      strokeColor="#ff5064"
                      :showInfo="false"
                      style="padding-bottom: 0.4rem"/>
        </a-tooltip>

      </div>

      <div class="progress-statistics">

        <a-row :gutter="12">

          <a-col :span="8">
            <span class="dif-text" style="color: #00af9b; padding-bottom: 0.5rem">简单</span>
            <div>
              <span class="static-solve-span">{{ value.easySolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ value.easyTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <div>
              <span class="dif-text" style="color: #ffb800; padding-bottom: 0.5rem">中等</span>
            </div>

            <div>
              <span class="static-solve-span">{{ value.mediumSolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ value.mediumTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <span class="dif-text" style="color: #ff2d55; padding-bottom: 0.5rem">困难</span>
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

import * as echarts from 'echarts';
import {onMounted} from "vue";

export default {
  props:['value'],
  name: "user-statistics",
  components: {},

  setup() {
    onMounted(() => {
      let myChart = echarts.init(document.getElementById('echarts-container') as HTMLElement);
      myChart.setOption({
        title: {
          text: '161\n解决问题',
          color: 'grey',
          left: 'center',
          top: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: ['80%', '90%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'inside'
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 50, itemStyle: {color:'#00af9b'} },
              { value: 30, itemStyle: {color:'#ffb800'} },
              { value: 20, itemStyle: {color:'#ff2d55'} },
              { value: 300, itemStyle: {color:'#dfd6d7'} },
            ]
          }
        ]
      })
    })

    return {}
  }
}
</script>

<style scoped>
.user-statistics{
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  padding: 1rem;
}

.text-area{
  color: #8a8a8e;
  position: absolute;
}

#echarts-container{
  width: 8rem;
  height: 8rem;
  margin-left: 1.7rem;
  margin-top: 1rem;
}

.progress-display {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.progress-line-chart {
  width: 8rem;
  margin-right: 1.5rem;
  margin-left: 1.5rem;
}

.progress-statistics {
  flex: 1;
  line-height: 100%;
}

.static-solve-span {
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
  float: left;
  color: #5c5c5c;
  display: block
}

.static-total-span {
  margin-top: 0.3rem;
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