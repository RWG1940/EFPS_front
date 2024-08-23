<template>
    <div class="cooperaMsg">
        <el-scrollbar height="200px" style="border-radius: 5px;">
            <t-alert v-for="(message, index) in messages" :key="index" :title="message.title" :message="message.content"
                :content="message.content" :theme="message.theme" style="width: 460px;margin-bottom: 5px;" :max-line="2" />
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue' 

const messages = ref([
    { title: '正在管制xxx进程单', content: '正在处理中',theme:'info' },
    { title: 'xxx进程单移交失败', content: '发生冲突',theme:'error' },
    { title: 'xxx进程单移交成功', content: 'okkk',theme:'success' },

   
]);

</script>
<style scoped>
.cooperaMsg {
    padding: 10px;
}  
</style>