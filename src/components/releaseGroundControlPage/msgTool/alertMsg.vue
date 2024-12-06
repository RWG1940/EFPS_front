<template>
    <div class="alertMsg">
        <el-scrollbar height="210px" style="border-radius: 5px;">
            <t-alert v-for="(message, index) in messages" :key="index" :title="message.title" :message="message.content"
                :content="message.content" theme="error" style="width: 460px;margin-bottom: 5px;" :max-line="2" effect="dark" />
        </el-scrollbar>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue' 

const messages = ref([
    { title: '美军轰炸我方机场', content: '请全体人员疏散至地下防空洞'},
   
]);

</script>
<style scoped>
.alertMsg {
    padding: 10px;
}  
</style>