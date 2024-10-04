<template>
    <t-row>
        <t-col :span="12">
            <div id="airFlow" style=" height: 300px;width: 500px;"></div>
        </t-col>
    </t-row>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onBeforeMount } from 'vue'
import { ref } from 'vue';

onMounted(async () => {

    const u = echarts.init(document.getElementById('airFlow') as HTMLDivElement);
    console.log(u)

    const option = {
  xAxis: {
    type: 'category',
    data: ['东高', '西高', '南高', '北高', '东低', '西低', '南低', '北低']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130,140],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)'
      },
      label: {
            show: true,
            position: 'top'
          }
    }
  ]
};
    u.setOption(option)
})

</script>
<style scoped>

</style>