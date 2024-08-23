<template>
    <div class="aircraftsTrends">
        <el-scrollbar height="300px">
            <t-notification v-for="(message, index) in messages" :key="index" :title="message.title"
                :content="message.content" :theme="message.theme" style="width: 460px;margin-bottom: 5px;" :max-line="2" />
        </el-scrollbar>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const messages = ref([
    { title: '航班延误', content: '航班 CA123 延误 30 分钟', theme: 'warning' },
    { title: '飞机故障', content: '航班 MU456 发生机械故障，需维修', theme: 'error' },
    { title: '正常', content: '航班 CZ789 已按计划起飞', theme: 'success' },
    { title: '航班延误', content: '航班 CA123 延误 30 分钟', theme: 'warning' },
    { title: '正常', content: '航班 CZ789 已按计划起飞', theme: 'success' },
    { title: '航班延误', content: '航班 CA123 延误 30 分钟', theme: 'warning' },
    { title: '飞机故障', content: '航班 MU456 发生机械故障，需维修', theme: 'error' },
    { title: '正常', content: '航班 CZ789 已按计划起飞', theme: 'success' },
]);


</script>
  
<style scoped>
.aircraftsTrends {
    padding: 10px;
}
</style>
  