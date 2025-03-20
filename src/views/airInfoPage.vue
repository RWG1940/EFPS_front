<template>
    <div class="wrap">
        <t-row>
            <t-col style="font-weight: bold;border-bottom: 5px solid blue;">航班信息表
            </t-col>
        </t-row>
        <t-row style="margin-top: 15px;margin-bottom: 15px;" :gutter="10">
            <t-col :span="1">
                <t-input placeholder="航班号" v-model="searchAimData.flightNumber"></t-input>
            </t-col>
            <t-col :span="1">
                <t-input placeholder="机型" v-model="searchAimData.aircraftType"></t-input>
            </t-col>
            <t-col :span="1">
                <t-input placeholder="起降机场" v-model="searchAimData.departureAirport"></t-input>
            </t-col>
            <t-col :span="1">
                <t-input placeholder="目的机场" v-model="searchAimData.arrivalAirport"></t-input>
            </t-col>

            <t-button @click="handleSearchBtn" style="margin-left: 5px;">
                <template #icon><search-icon /></template>
                搜索
            </t-button>


            <t-button theme="primary" variant="outline" @click="refreshTableDataBtn" style="margin-left: 10px;">
                <template #icon><refresh-icon /></template>
                重置
            </t-button>


            <t-button theme="danger" :variant="flightInfoStore.selectedIds.length > 0 ? 'base' : 'outline'"
                @click="handleDeleteBtn" style="margin-left: 10px;">
                <template #icon><delete-1-icon /></template>
                删除
                <div v-if="flightInfoStore.selectedIds.length > 0">（已选中{{ flightInfoStore.selectedIds.length }}条）</div>
            </t-button>

            <t-button theme="primary" @click="toScreen" style="margin-left: 400px;">
                <template #icon><screencast-icon /></template>
                航班信息大屏
            </t-button>

        </t-row>
        <flightInfoDataTable />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import flightInfoDataTable from "@/components/flightInfoPage/flightInfoDataTable.vue"
import {flightInfoStore, searchAimData} from '@/stores/flightInfo-store';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { useRouter } from 'vue-router'


const handleSearchBtn = () => {
    flightInfoStore.searchData(searchAimData.value).then(() => {
        flightInfoStore.dataPages = flightInfoStore.searchResultData as any
        flightInfoStore.pageDataSum = flightInfoStore.dataPages.length
    })
}
const refreshTableDataBtn = () => {
    flightInfoStore.fetchPageData()
    searchAimData.value = {} as any
}
const handleDeleteBtn = () => {
    if (flightInfoStore.selectedIds.length === 0) {
        MessagePlugin.warning('请选择要删除的航班信息');
        return;
    }
    const dia = DialogPlugin(
        {
            header: '提示',
            body: '确定删除所选的航班信息吗？这会导致航班占有的停机位和跑道信息无法显示，请谨慎操作！',
            confirmBtn: '确定',
            cancelBtn: '取消',
            onConfirm: () => {
                flightInfoStore.deleteData(flightInfoStore.selectedIds)
                dia.destroy()
            },
            onCancel: () => { dia.destroy() }
        }
    )
}
const router = useRouter()
const toScreen = () => {
    router.push('/airScreen')
}
onMounted(() => {
    flightInfoStore.fetchPageData()
    flightInfoStore.fetchAllData()
})

</script>
<style scoped>
.wrap {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 98%;
}
</style>