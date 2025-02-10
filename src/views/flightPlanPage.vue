<template>
    <div class="wrap">
        <t-row>
            <t-col style="font-weight: bold;border-bottom: 5px solid blue;">飞行计划表
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


            <t-button theme="warning" :variant="flightPlanStore.selectedIds.length > 0 ? 'base' : 'outline'"
                @click="handleSelectedIdsTransferBtn" style="margin-left: 10px;">
                <template #icon><send-icon /></template>
                一键转单
                <div v-if="flightPlanStore.selectedIds.length > 0 && !loadingBtn">（已选中{{ flightPlanStore.selectedIds.length }}条）</div>
                <t-loading :loading="loadingBtn" size="small"></t-loading>

            </t-button>



            <t-button theme="primary" variant="outline" @click="handleAddVisibleChange" style="margin-left: 10px;">
                <template #icon><add-icon /></template>
                手动添加
            </t-button>


            <t-button theme="primary" variant="outline" @click="" style="margin-left: 10px;">
                <template #icon><internet-icon /></template>
                拉单
            </t-button>

            <t-button theme="danger" :variant="flightPlanStore.selectedIds.length > 0 ? 'base' : 'outline'"
                @click="handleDeleteBtn" style="margin-left: 10px;">
                <template #icon><delete-1-icon /></template>
                删除
                <div v-if="flightPlanStore.selectedIds.length > 0">（已选中{{ flightPlanStore.selectedIds.length }}条）</div>
            </t-button>

        </t-row>
        <flightPlanDataTable />
        <flightPlanDataAdd :visible="addVisible" @update:visible="handleAddVisibleChange" />
        <TransferFlightPlanGroupPanel :visible="transferGroupVisible" @update:visible="handleTransferGroupVisibleChange" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import flightPlanDataTable from "@/components/flightPlanPage/flightPlanDataTable.vue"
import {
    flightPlanStore, searchAimData, flightPlanTransferDataGroup,
    efpsDataGroup, flightInfoDataGroup, flightInfoData, efpsData, flightPlanTransferData
} from '@/stores/flightPlan-store';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import flightPlanDataAdd from '@/components/flightPlanPage/flightPlanDataAdd.vue';
import type { FlightPlan } from '@/types/flightPlanTypes';
import { formatDate3 } from '@/utils/moment';
import TransferFlightPlanGroupPanel from '@/components/flightPlanPage/transferFlightPlanGroupPanel.vue';

const loadingBtn = ref(false)
const airport = ref(import.meta.env.AIRPORT_CODE)
const addVisible = ref(false)
const transferGroupVisible = ref(false)
const handleAddVisibleChange = () => {
    addVisible.value = !addVisible.value
}
const handleTransferGroupVisibleChange = () => {
    transferGroupVisible.value = !transferGroupVisible.value
}
const handleSearchBtn = () => {
    flightPlanStore.searchData(searchAimData.value).then(() => {
        flightPlanStore.dataPages = flightPlanStore.searchResultData as any
        flightPlanStore.pageDataSum = flightPlanStore.dataPages.length
    })
}
const refreshTableDataBtn = () => {
    flightPlanStore.fetchPageData()
    searchAimData.value = {} as any
}
const handleDeleteBtn = () => {
    if (flightPlanStore.selectedIds.length === 0) {
        MessagePlugin.warning('请选择要删除的航班计划');
        return;
    }
    const dia = DialogPlugin(
        {
            header: '提示',
            body: '确定删除所选的航班计划吗？',
            confirmBtn: '确定',
            cancelBtn: '取消',
            onConfirm: () => {
                flightPlanStore.deleteData(flightPlanStore.selectedIds)
                dia.destroy()
            },
            onCancel: () => { dia.destroy() }
        }
    )
}
const handleSelectedIdsTransferBtn = () => {
    if (flightPlanStore.selectedIds.length === 0) {
        MessagePlugin.warning('请选择要转单的航班计划')
        return
    }
    loadingBtn.value = !loadingBtn.value
    flightPlanTransferDataGroup.value = []
    efpsDataGroup.value = []
    flightInfoDataGroup.value = []
    flightPlanStore.selectedIds.forEach((selectedId) => {
    
        // 查找对应的 item
        const item = flightPlanStore.data.find((item: any) => item.id == selectedId) as FlightPlan;
        if (item) {
   
            flightPlanTransferDataGroup.value.push(item);
            // 转进程单
            efpsData.value.a1 = item.flightNumber
            efpsData.value.b1 = item.aircraftType
            efpsData.value.e1 = item.departureAirport
            efpsData.value.h1 = item.arrivalAirport
            if (item.arrivalAirport == airport.value) {
                efpsData.value.fg1 = formatDate3(item.scheduledArrivalTime as any)
            } else {
                efpsData.value.fg1 = formatDate3(item.scheduledDepartureTime as any)
            }
            efpsData.value.e4 = item.stand
            efpsDataGroup.value.push(efpsData.value)
            efpsData.value = {} as any
            // 转航班信息
            flightInfoData.value.flightNumber = item.flightNumber
            flightInfoData.value.arrivalAirport = item.arrivalAirport
            flightInfoData.value.departureAirport = item.departureAirport
            flightInfoData.value.scheduledArrivalTime = item.scheduledArrivalTime
            flightInfoData.value.scheduledDepartureTime = item.scheduledDepartureTime
            flightInfoData.value.aircraftType = item.aircraftType
            flightInfoDataGroup.value.push(flightInfoData.value)
            flightInfoData.value = {} as any
        }
    });
    setTimeout(() => {
        loadingBtn.value = !loadingBtn.value
        handleTransferGroupVisibleChange()
    }, 800)
  
}
onMounted(() => {
    flightPlanStore.fetchPageData()
    flightPlanStore.fetchAllData()
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
}</style>