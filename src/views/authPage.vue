<template>
    <div style="padding: 20px;">
        <t-progress theme="circle" :percentage="percentage" size="small" />
        <h2>正在检查权限...</h2>
        <h1>目标地址: {{ store.aimRoutePath }}</h1>

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
        if (percentage.value < 100) {
            percentage.value += 10; // 每次增加10%
        } else {
            clearInterval(interval); // 当百分比到达100时停止增加
            router.replace('/' + store.aimRoutePath); // 跳转到目标页面
        }
    }, 100);
});
</script>
  
<style scoped></style>
  