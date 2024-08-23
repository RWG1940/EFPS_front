<template>
    <div class="sysMsg">
        <el-scrollbar height="200px" style="border-radius: 5px;">
        <el-alert v-for="(message, index) in messages" :key="index" :title="message.title" :type="message.theme"
            :description="message.content" show-icon style="width: 460px;margin-bottom: 5px;" :max-line="2"/>
        </el-scrollbar>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const messages = ref([
    { title: '欢迎使用EFPS system', content: '2024.8.21', theme: 'info' },
    { title: '区域管制席：任卫国先生，权限认证成功！', content: '2024.8.21', theme: 'success' },
]);
</script>
<style scoped>
.sysMsg {
    padding: 10px;
}  
</style>