<template>
  <div class="heatmap-main">

    <div>
      过去一年提交69次
    </div>

    <div>
      <div id="heatmap" style="width: 55rem; height: 12rem"></div>
    </div>
  </div>
</template>

<script lang="ts">

import * as echarts from 'echarts';
import {onMounted} from "vue";

export default {
  name: "user-heat-map",
  components: {},

  setup() {

    function getVirtualData() {
      let today = Number(echarts.number.parseDate(new Date()));
      let dayTime = 3600 * 24 * 1000;
      let thatday = today - dayTime * 365;
      let data = [];
      for (let time = thatday; time < today; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 15)
        ]);
      }
      return {
        data,
        today: echarts.format.formatTime('yyyy-MM-dd', today),
        thatday: echarts.format.formatTime('yyyy-MM-dd', thatday)
      };
    }

    onMounted(() => {

      let myChart = echarts.init(document.getElementById('heatmap') as HTMLElement);
      let option = {
        //todo 根据从后端获取到的最大值设置max
        visualMap: {
          min: 0,
          max: 20,
          inRange: {
            color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196027', '#175b2f']
          },
          show: false
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
          cellSize: [12, 12],
          range: [getVirtualData()['thatday'], getVirtualData()['today']],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 3
          },
          splitLine: {
            show: false
          },
          yearLabel: {show: false},
          //x轴坐标
          monthLabel:{
            nameMap: ['', '', '', '', '', '', '','','','','','']
          },
          //y轴坐标
          dayLabel:{
            nameMap: ['', '', '', '', '', '', '']
          }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getVirtualData()['data'],
          top: 0,
        },
      };

      myChart.setOption(option);
    })

  }

}
</script>

<style scoped>

.heatmap-main {
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
}

</style>