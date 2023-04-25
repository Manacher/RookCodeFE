<template>
  <div class="heatmap-main">

    <div class="text-area">
      <div>
        过去一年共提交
        <span style="font-size: 1.1rem; color: #262626; font-weight: bold">{{ totalNum }}</span>
        次
      </div>

      <div style="margin-left: auto; color: #8a8a8e">
        累积提交天数:
        <span style="color: #5c5c5c">{{ totalDay }}</span>
        <a-select v-model:value="yearSelected" style="width: 6.5rem; margin-left: 1.5rem;">
          <a-select-option value="lastYear">过去一年</a-select-option>
        </a-select>
      </div>

    </div>

    <div class="heatmap-container">
      <div id="heatmap" style="width: 41rem; height: 7rem"></div>
    </div>
  </div>
</template>

<script lang="ts">

import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import {getUserYearSubmit} from "@/views/userPage/userPageHttp";
import {message} from "ant-design-vue";
import {processUserHeatmapData} from "@/views/userPage/userPageUtil";

export default {
  props: ['account'],
  name: "user-heat-map",

  setup(props: any, context: any) {

    let totalNum = ref(0);
    let totalDay = ref(0);
    let yearSelected = ref('lastYear');

    let changeSelectorStyle = () => {
      let selector = document.getElementsByClassName('ant-select-selector')[0] as HTMLElement;
      selector.style.border = 'none';
      selector.style.background = '#f2f3f4';
      selector.style.borderRadius = '0.3rem';
      selector.style.color = '#595959';
    }

    let init = () => {
      getUserYearSubmit(props.account).then((res: any) => {
        if (res.success) {
          let processRes = processUserHeatmapData(res.data);
          let dataList = processRes[0]
          let maxSubmit = processRes[1] as number
          totalNum.value = processRes[2] as number
          totalDay.value = processRes[3] as number

          console.log("dataList", dataList)

          let today = Number(echarts.number.parseDate(new Date()));
          let lastYearDay = today - 3600 * 24 * 1000 * 364;
          let todayString = echarts.format.formatTime('yyyy-MM-dd', today)
          let lastYearDayString = echarts.format.formatTime('yyyy-MM-dd', lastYearDay)
          renderChart(todayString, lastYearDayString, dataList, maxSubmit)
        } else {
          message.error(res.message)
        }

      })
    }

    let renderChart = (startDate: string, endDate: string, data: any, maxSubmit: number) => {
      let myChart = echarts.init(document.getElementById('heatmap') as HTMLElement);
      let option = {
        visualMap: {
          min: 0,
          max: maxSubmit,
          inRange: {
            color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196027', '#175b2f']
          },
          show: false,
        },

        // 显示提交数量与日期
        tooltip: {
          formatter: function (p: any) {
            let format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
            let suffix = p.data[1] === 0 ? '没有提交，' : p.data[1] + '个提交，'
            return suffix + format;
          },
          backgroundColor: '#2a2a2a',
          textStyle: {
            color: '#ffffff'
          }

        },
        backgroundColor: '#fff',
        calendar: {
          top: 0,
          left: 5,
          cellSize: [12, 12],
          range: [startDate, endDate],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 3
          },
          splitLine: {
            show: false
          },
          yearLabel: {show: false},
          //x轴坐标
          monthLabel: {
            position: 'bottom',
            textStyle: {
              color: '#afb4bd'
            },
            padding: [3, 0, 0, 0]
          },
          //y轴坐标
          dayLabel: {
            show: false,
          }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: data,
        },
      };
      myChart.setOption(option);
    }

    onMounted(() => {
      init();
      changeSelectorStyle();
    })

    return {
      totalNum,
      totalDay,
      yearSelected,
    }

  }

}
</script>

<style scoped>

.heatmap-main {
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  font-family: 微软雅黑;
  box-shadow: 0 2px 8px lightgrey;
}

.text-area {
  text-align: left;
  color: #5c5c5c;
  font-size: 0.9rem;
  padding-bottom: 0.8rem;
  display: flex;
  flex-direction: row;
}

.heatmap-container {
  overflow-x: auto;
  display: inline-block;
}

</style>