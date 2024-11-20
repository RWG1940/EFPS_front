<template>
  <t-row>
    <t-col :span="12">
      <div id="airFlow" style=" height: 400px;width: 500px;"></div>
    </t-col>
  </t-row>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onBeforeMount } from 'vue'
import { useAirspaceInfoStore } from '../../stores/airspaceInfo-store';


const store = useAirspaceInfoStore();

onMounted(async () => {
  
  const u = echarts.init(document.getElementById('airFlow') as HTMLDivElement);
  u.showLoading();
  await store.getEHairspaceInfo()
  await store.getWHairspaceInfo()
  await store.getSHairspaceInfo()
  await store.getWLairspaceInfo()
  await store.getNLairspaceInfo()
  await store.getNHairspaceInfo()
  await store.getELairspaceInfo()
  await store.getSLairspaceInfo()
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
        data: [store.EHairspaceInfo?.quantity, store.WHairspaceInfo?.quantity, store.SHairspaceInfo?.quantity, store.NHairspaceInfo?.quantity, store.ELairspaceInfo?.quantity, store.WLairspaceInfo?.quantity, store.SLairspaceInfo?.quantity, store.NLairspaceInfo?.quantity],
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
  u.hideLoading();
  u.setOption(option);
})

</script>
<style scoped></style>