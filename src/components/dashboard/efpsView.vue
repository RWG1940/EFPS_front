<template>
  <t-row>
    <t-col :span="6">
      <div id="efps1" style=" height: 300px;"></div>
    </t-col>
    <t-col :span="6">
      <div id="efps2" style=" height: 300px;"></div>
    </t-col>
  </t-row>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onBeforeMount } from 'vue'
import { useAreaEfpsStore,filterEfpsByStatusAndDate,getOffsetDate } from '../../stores/areaEfps-store';
import { ref } from 'vue';

const efpsStore = useAreaEfpsStore();
const dataPoints0 = ref<number[]>([]);
const dataPoints1 = ref<number[]>([]);
const dataPoints2 = ref<number[]>([]);
const dataPoints3 = ref<number[]>([]);
onBeforeMount(async () => {
  await efpsStore.fetchAllData().then(() => {
    const u = echarts.init(document.getElementById('efps1') as HTMLDivElement);
    u.showLoading();
    dataPoints0.value = [
      filterEfpsByStatusAndDate(1, 1, getOffsetDate(6)).value,
      filterEfpsByStatusAndDate(1, 1, getOffsetDate(5)).value,
      filterEfpsByStatusAndDate(1, 1, getOffsetDate(4)).value,
      filterEfpsByStatusAndDate(1, 1, getOffsetDate(3)).value,
      filterEfpsByStatusAndDate(1, 1, getOffsetDate(2)).value,
      filterEfpsByStatusAndDate(1, 1, getOffsetDate(1)).value,
      filterEfpsByStatusAndDate(1, 1, getOffsetDate(0)).value
    ];
    dataPoints1.value = [
      filterEfpsByStatusAndDate(4, 1, getOffsetDate(6)).value,
      filterEfpsByStatusAndDate(4, 1, getOffsetDate(5)).value,
      filterEfpsByStatusAndDate(4, 1, getOffsetDate(4)).value,
      filterEfpsByStatusAndDate(4, 1, getOffsetDate(3)).value,
      filterEfpsByStatusAndDate(4, 1, getOffsetDate(2)).value,
      filterEfpsByStatusAndDate(4, 1, getOffsetDate(1)).value,
      filterEfpsByStatusAndDate(4, 1, getOffsetDate(0)).value
    ];
    dataPoints2.value = [
      filterEfpsByStatusAndDate(1, 0, getOffsetDate(6)).value,
      filterEfpsByStatusAndDate(1, 0, getOffsetDate(5)).value,
      filterEfpsByStatusAndDate(1, 0, getOffsetDate(4)).value,
      filterEfpsByStatusAndDate(1, 0, getOffsetDate(3)).value,
      filterEfpsByStatusAndDate(1, 0, getOffsetDate(2)).value,
      filterEfpsByStatusAndDate(1, 0, getOffsetDate(1)).value,
      filterEfpsByStatusAndDate(1, 0, getOffsetDate(0)).value
    ];
    dataPoints3.value = [
      filterEfpsByStatusAndDate(4, 0, getOffsetDate(6)).value,
      filterEfpsByStatusAndDate(4, 0, getOffsetDate(5)).value,
      filterEfpsByStatusAndDate(4, 0, getOffsetDate(4)).value,
      filterEfpsByStatusAndDate(4, 0, getOffsetDate(3)).value,
      filterEfpsByStatusAndDate(4, 0, getOffsetDate(2)).value,
      filterEfpsByStatusAndDate(4, 0, getOffsetDate(1)).value,
      filterEfpsByStatusAndDate(4, 0, getOffsetDate(0)).value
    ];
    u.hideLoading();

    const option1 = {
      legend: {
        data: ['进港-总数', '进港-已完成']
      },
      xAxis: {
        data: ['六天前', '五天前', '四天前', '三天前', '两天前', '一天前', '今天']
      },
      yAxis: {},
      series: [
        {
          name: '进港-总数',
          data: dataPoints0.value,
          type: 'line',
          label: {
            show: true,
            position: 'bottom'
          }
        },
        {
          name: '进港-已完成',
          data: dataPoints1.value,
          type: 'line',
          label: {
            show: true,
            position: 'top'
          }
        }
      ]
    }
    u.setOption(option1);
    const v = echarts.init(document.getElementById('efps2') as HTMLDivElement)
    const option2 = {
      legend: {
        data: ['出港-总数', '出港-已完成']
      },
      xAxis: {
        data: ['六天前', '五天前', '四天前', '三天前', '两天前', '一天前', '今天']
      },
      yAxis: {},
      series: [
        {
          name: '出港-总数',
          data: dataPoints2.value,
          type: 'line',
          label: {
            show: true,
            position: 'bottom'
          }
        },
        {
          name: '出港-已完成',
          data: dataPoints3.value,
          type: 'line',
          label: {
            show: true,
            position: 'top'
          }
        }

      ]
    }
    v.setOption(option2)
  })
})
</script>
<style scoped></style>