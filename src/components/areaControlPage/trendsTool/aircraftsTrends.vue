<template>
    <div class="aircraftsTrends">
        <el-scrollbar height="300px" style="border-radius: 10px;">
            <t-notification v-for="(message, index) in aircraftsTrendsStore.aircraftsTrendsData" :key="index" :title="message.header"
                :content="message.content" :footer="formatDate(message.createtime || '')" :theme="message.theme" style="width: 460px;margin-bottom: 5px;" :max-line="2" />
        </el-scrollbar>
    </div>
</template>
  
<script lang="ts" setup>
import { ref,onMounted } from 'vue';
import { useAircraftsTrendsStore } from '@/stores/aircraftsTrends-store'
import { formatDate } from '@/utils/moment'

const aircraftsTrendsStore = useAircraftsTrendsStore()

onMounted(() => {
    aircraftsTrendsStore.fetchAllAircraftsTrendsData()
})
</script>
  
<style scoped>
.aircraftsTrends {
    padding: 10px;
}
</style>
  