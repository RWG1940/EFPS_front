<template>
    <div class="importantMsg">
        <el-scrollbar height="210px" style="border-radius: 5px;">
            <t-notification v-for="(message, index) in noticesDataPublished" :key="index" :title="message.header" :message="message.content"
                :content="message.content" theme="warning" :footer="formatDate(message.createtime || '')" style="width: 460px;margin-bottom: 5px;" :max-line="2" />
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useNoticesStore,noticesDataPublished } from '@/stores/notices-store'
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