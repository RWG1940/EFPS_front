<template>
    <div class="importantMsg">
        <el-scrollbar height="200px" style="border-radius: 5px;">
            <t-alert v-for="(message, index) in messages" :key="index" :title="message.title" :message="message.content"
                :content="message.content" theme="warning" style="width: 460px;margin-bottom: 5px;" :max-line="2" />
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue' 

const messages = ref([
    { title: '雷暴天气', content: '预计半小时后机场全低空域有雷暴雨8.21 15.21'},
    { title: 'A线路关闭', content: 'A线路暂时关闭，或将5小时候重新开放8.21 15.26' },
   
]);

</script>
<style scoped>
.importantMsg {
    padding: 10px;
}  
</style>