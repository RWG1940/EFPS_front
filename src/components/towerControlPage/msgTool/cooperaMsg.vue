<template>
    <div class="cooperaMsg">
        <el-scrollbar height="210px" style="border-radius: 5px;">
            <t-notification v-for="(message, index) in cooperaMsgData" :key="index" :title="message.header"
                :message="message.content" :content="message.content" :theme="message.theme"
                :footer="formatDate(message.createtime || '')" style="width: 460px;margin-bottom: 5px;" :max-line="2" />
            <t-row v-if="cooperaMsgData.length == 0">没有协调数据😬</t-row>
            <t-row v-if="cooperaMsgData.length == 0">NO DATA FOUND</t-row>
        </el-scrollbar>
        <div style="background-color: rgba(174, 185, 195, 0.416);padding: 5px;border-radius: 5px;">
            共{{ cooperaMsgData.length }}条数据
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usecooperaMsgStore, cooperaMsgData } from '@/stores/cooperaMsg-store'
import { formatDate } from '@/utils/moment'

const cooperaMsgStore = usecooperaMsgStore()

onMounted(() => {
    cooperaMsgStore.fetchAllData()
})
</script>
<style scoped>
.cooperaMsg {
    padding: 10px;
}
</style>