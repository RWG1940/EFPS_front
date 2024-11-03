<template>
  <div id="users" style=" height: 300px;"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onBeforeMount } from 'vue'
import { useUserStore } from '../../stores/user-store';
import { useDeptStore } from '../../stores/dept-store';

const userStore = useUserStore()
const deptStore = useDeptStore()
onBeforeMount(async () => {
  await deptStore.getAllDeptData();
  const u = echarts.init(document.getElementById('users') as HTMLDivElement)
  u.showLoading();
  deptStore.tableData.forEach((item) => {
    item.dOnlineTotal = item.dOnlineTotal || 0;
  });
  const deptMap = new Map();
  deptStore.tableData.forEach((item) => {
    deptMap.set(item.id, item);
  });
  await userStore.getAllUserData().then(() => {
    userStore.tableData.forEach((element: any) => {
      const deptItem = deptMap.get(element.emp.eDeptid);
      if (deptItem && element.isOnline === 1) {
        deptItem.dOnlineTotal++;
      }
    });
    const option0 = {
      title: {
        text: '员工概览',
        left: 'center',
        top: 'center'
      },
      series: [
        {
          type: 'pie',
          data: formatChartData(deptStore.deptTotal),
          radius: ['40%', '70%']
        }
      ]
    };
    u.hideLoading();
    u.setOption(option0);
  })
})

function formatChartData(data: any) {
  let arr: any[] = []
  data.forEach((element: any) => {
    arr.push({
      value: element.dTotal,
      name: `${element.dName}:${element.dTotal},在线数:${element.dOnlineTotal}`
    })
  });
  return arr
}
</script>
<style scoped></style>