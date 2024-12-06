<template>
    <div class="sysMsg">
        <el-scrollbar height="210px" style="border-radius: 5px;">
        <el-alert v-for="(message, index) in store.data" :key="index" :title="message.title" :type="message.theme"
            :description="message.content" show-icon style="width: 460px;margin-bottom: 5px;" :max-line="2"/>
        </el-scrollbar>
    </div>
</template>
<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { usesysMsgStore } from '@/stores/sysMsg-store';

const store = usesysMsgStore()
onMounted(() => {
    store.fetchAllData()
})
</script>
<style scoped>
.sysMsg {
    padding: 10px;
}  
</style>