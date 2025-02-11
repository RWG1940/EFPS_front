<template>
    <div class="importantMsg">
        <el-scrollbar height="210px" style="border-radius: 5px;">
            <t-notification v-for="(message, index) in noticesDataPublished" :key="index" :title="message.header"
                :message="message.content" :content="message.content" theme="warning"
                :footer="formatDate(message.createtime || '')" style="width: 460px;margin-bottom: 5px;" :max-line="2" />
            <t-row v-if="noticesDataPublished.length == 0">没有通知数据😬</t-row>
            <t-row v-if="noticesDataPublished.length == 0">NO DATA FOUND</t-row>
        </el-scrollbar>
        <div style="background-color: rgba(174, 185, 195, 0.416);padding: 5px;border-radius: 5px;">
            共{{ noticesDataPublished.length }}条数据
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNoticesStore, noticesDataPublished } from '@/stores/notices-store'
import { formatDate } from '@/utils/moment'

const noticesStore = useNoticesStore()

onMounted(() => {
    noticesStore.fetchAllData()
})
</script>
<style scoped>
.importantMsg {
    padding: 10px;
}
</style>