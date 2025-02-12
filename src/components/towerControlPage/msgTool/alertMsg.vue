<template>
    <div class="alertMsg">
        <el-scrollbar height="210px" style="border-radius: 5px;">
            <t-notification v-for="(message, index) in alertMsgData" :key="index" :title="message.header"
                :message="message.content" :content="message.content" theme="error"
                :footer="formatDate(message.createtime || '')" style="width: 460px;margin-bottom: 5px;" :max-line="2" />
            <t-row v-if="alertMsgData.length == 0">没有告警数据😬</t-row>
            <t-row v-if="alertMsgData.length == 0">NO DATA FOUND</t-row>
        </el-scrollbar>
        <div style="background-color: rgba(174, 185, 195, 0.416);padding: 5px;border-radius: 5px;">
            共{{ alertMsgData.length }}条数据
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAlertMsgStore, alertMsgData } from '@/stores/alertMsg-store'
import { formatDate } from '@/utils/moment'

const alertStore = useAlertMsgStore()

onMounted(() => {
    alertStore.fetchAllData()
})
</script>
<style scoped>
.alertMsg {
    padding: 10px;
}
</style>