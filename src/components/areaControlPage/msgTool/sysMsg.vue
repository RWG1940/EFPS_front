<template>
    <div class="sysMsg">
        <el-scrollbar height="210px" style="border-radius: 5px;">
        <el-alert v-for="(message, index) in sysMsgData" :key="index" :title="message.header" :type="message.theme"
            :description="message.content" show-icon style="width: 460px;margin-bottom: 5px;" :max-line="2"/>
        </el-scrollbar>
        <div style="background-color: rgba(174, 185, 195, 0.416);padding: 5px;border-radius: 5px;">
            共{{ sysMsgData.length }}条数据
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { usesysMsgStore,sysMsgData } from '@/stores/sysMsg-store';
import { useUserStore } from '@/stores/user-store';

const store = usesysMsgStore()
onMounted(() => {
    store.addData({
    header: `欢迎~${useUserStore().myData.emp.eName}~登陆成功`,
    content: Date().toLocaleString(),
    status: 1,
    author: '系统提示',
    theme: 'success',
}).then(() => {
    store.fetchAllData()
})
})
</script>
<style scoped>
.sysMsg {
    padding: 10px;
}  
</style>