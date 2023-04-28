<template>

  <div class="user-statistics">
    <div class="text-area">
      解题数量
    </div>

    <div id="echarts-container"/>

    <div class="progress-display">
      <div class="progress-line-chart">

        <a-tooltip title="简单">
          <a-progress :percent="statisticsData.easySolved / statisticsData.easyTotal * 100"
                      size="large"
                      strokeColor="#00af9b"
                      :showInfo="false"
                      style="padding-bottom: 0.8rem"/>
        </a-tooltip>

        <a-tooltip title="中等">
          <a-progress :percent="statisticsData.mediumSolved / statisticsData.mediumTotal * 100"
                      size="large"
                      strokeColor="#ffb800"
                      :showInfo="false"
                      style="padding-bottom: 0.8rem"/>
        </a-tooltip>

        <a-tooltip title="困难">
          <a-progress :percent="statisticsData.hardSolved / statisticsData.hardTotal * 100"
                      size="large"
                      strokeColor="#ff5064"
                      :showInfo="false"/>
        </a-tooltip>

      </div>

      <div class="progress-statistics">

        <a-row :gutter="12">

          <a-col :span="8">
            <span class="dif-text" style="color: #00af9b;">简单</span>
            <div>
              <span class="static-solve-span">{{ statisticsData.easySolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ statisticsData.easyTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <div>
              <span class="dif-text" style="color: #ffb800;">中等</span>
            </div>

            <div>
              <span class="static-solve-span">{{ statisticsData.mediumSolved }}</span>
              <a-divider style="margin:0"/>
              <span class="static-total-span">{{ statisticsData.mediumTotal }}</span>
            </div>
          </a-col>

          <a-col :span="8">
            <span class="dif-text" style="color: #ff2d55;">困难</span>
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

import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import {getUserPageProgressData} from "@/views/userPage/userPageHttp";
import {message} from "ant-design-vue";

export default {
  props: ['account'],
  name: "user-statistics",


  setup(props: any, context: any) {

    let statisticsData = ref({
      easyTotal: 0,
      mediumTotal: 0,
      hardTotal: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0
    })


    onMounted(() => {
      getUserPageProgressData(props.account).then((res: any) => {
        if (res.success) {
          // console.log("user sta", res)
          let data = res.data
          statisticsData.value.easyTotal = data.easy_total
          statisticsData.value.mediumTotal = data.medium_total
          statisticsData.value.hardTotal = data.hard_total
          statisticsData.value.easySolved = data.easy_solved
          statisticsData.value.mediumSolved = data.medium_solved
          statisticsData.value.hardSolved = data.hard_solved
          // console.log("user sta data", statisticsData)
          chartInit()
        } else {
          message.error(res.message)
        }
      })
    })


    let chartInit = () => {
      let myChart = echarts.init(document.getElementById('echarts-container') as HTMLElement);
      myChart.setOption({
        title: {
          text: statisticsData.value.easySolved + statisticsData.value.mediumSolved + statisticsData.value.hardSolved + '\n解决问题',
          color: 'grey',
          left: 'center',
          top: 'center',
          textStyle: {
            fontSize: 15
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['90%', '100%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'inside'
            },
            labelLine: {
              show: false
            },
            silent: true,
            data: [
              {value: statisticsData.value.easySolved, itemStyle: {color: '#00af9b'}},
              {value: statisticsData.value.mediumSolved, itemStyle: {color: '#ffb800'}},
              {value: statisticsData.value.hardSolved, itemStyle: {color: '#ff2d55'}},
              {
                value: statisticsData.value.easyTotal - statisticsData.value.easySolved
                    + statisticsData.value.mediumTotal - statisticsData.value.mediumSolved
                    + statisticsData.value.hardTotal - statisticsData.value.hardSolved, itemStyle: {color: '#dfd6d7'}
              },
            ]
          }
        ]
      })
    }


    return {
      statisticsData

    }
  }
}
</script>

<style scoped>
.user-statistics {
  background-color: white;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  box-shadow: 0 2px 8px lightgrey;
}

.text-area {
  color: #8a8a8e;
  position: absolute;
}

#echarts-container {
  width: 6rem;
  height: 6rem;
  margin-top: 2rem;
}

.progress-display {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 0.9rem;
}

.progress-line-chart {
  width: 6rem;
  margin-right: 0.8rem;
  margin-left: 1.5rem;
  font-size: 0.5rem;
}

.progress-statistics {
  flex: 1;
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

.dif-text {
  float: left;
  padding-right: 0.5rem
}

.easy-sta .ant-statistic-title {
  color: #00af9b;
}

</style>