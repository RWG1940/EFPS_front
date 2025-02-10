<template>
    <div class="aircraftsTrends">
        <el-scrollbar height="310px" style="border-radius: 10px;">
            <t-notification v-for="(message, index) in aircraftsTrendsDataPublished" :key="index" :title="message.header"
                :content="message.content" :footer="formatDate(message.createtime || '')" :theme="message.theme"
                style="width: 460px;margin-bottom: 5px;" />
            <t-row v-if="aircraftsTrendsDataPublished.length == 0">没有动态数据😬</t-row>
            <t-row v-if="aircraftsTrendsDataPublished.length == 0">NO DATA FOUND</t-row>
        </el-scrollbar>

    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { aircraftsTrendsStore, aircraftsTrendsDataPublished } from '@/stores/aircraftsTrends-store'
import { formatDate } from '@/utils/moment'

onMounted(() => {
    aircraftsTrendsStore.fetchAllData()
})
</script>
  
<style scoped>
.aircraftsTrends {
    padding: 10px;
}
</style>
  