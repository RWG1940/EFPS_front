<template>
    <div style="padding: 20px;">
        <t-progress theme="circle" :percentage="percentage" size="small" />
        <h2>正在检查权限...</h2>
        <h1>目标地址: {{ store.aimRoutePath }}</h1>
        <h1 id="info" style="color: red;"></h1>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRouteStore } from "@/stores/routes-store";

const router = useRouter();
const store = useRouteStore();
const percentage = ref(0);

onMounted(() => {
    const interval = setInterval(() => {
        if (store.aimRoutePath == 'command-control/areaControl') {
            if (parseInt(sessionStorage.getItem('userDeptid') as string) == 47) {
                if (percentage.value < 100) {
                    percentage.value += 20;
                } else {
                    clearInterval(interval);
                    router.replace('/' + store.aimRoutePath);
                }
            } else {
                percentage.value = 0
                document.getElementById('info')!.innerHTML = '您没有权限访问该页面！'
                clearInterval(interval);
            }
        }
        if (store.aimRoutePath == 'command-control/towerControl') {
            if (parseInt(sessionStorage.getItem('userDeptid') as string) == 47) {
                if (percentage.value < 100) {
                    percentage.value += 20;
                } else {
                    clearInterval(interval);
                    router.replace('/' + store.aimRoutePath);
                }
            } else {
                percentage.value = 0
                document.getElementById('info')!.innerHTML = '您没有权限访问该页面！'
                clearInterval(interval);

            }
        } else {
            // 其它的页面权限判断
        }
    }, 100);
});
</script>
  
<style scoped></style>
  