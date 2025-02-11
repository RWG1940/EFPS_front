<template>
    <div class="table-container">
        <el-scrollbar style="width: 1250px;">
            <el-table :data="flightPlanStore.dataPages" class="table-style"
                @selection-change="flightPlanStore.handleSelectionChange" border>
                <el-table-column type="selection" width="40" fixed />
                <el-table-column label="航班号" prop="flightNumber" fixed width="100" show-overflow-tooltip />
                <el-table-column label="机型" prop="aircraftType" width="100" show-overflow-tooltip />
                <el-table-column label="起降机场" prop="departureAirport" width="100" show-overflow-tooltip />
                <el-table-column label="目的机场" prop="arrivalAirport" width="100" show-overflow-tooltip />
                <el-table-column label="计划起飞时间" prop="scheduledDepartureTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="计划到达时间" prop="scheduledArrivalTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="状态" prop="status" width="100" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag>{{ scope.row.status == 0 ?'计划中':scope.row.status == 1?'已转单':scope.row.status == 2?'延误':'取消' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="实际起飞时间" prop="actualDepartureTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="实际到达时间" prop="actualArrivalTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="机型" prop="aircraftType" width="100" show-overflow-tooltip />
                <el-table-column label="停机位" prop="stand" width="100" show-overflow-tooltip />
                <el-table-column label="登机口" prop="gate" width="100" show-overflow-tooltip />
                <el-table-column label="备注" prop="remarks" width="100" show-overflow-tooltip />
                <el-table-column label="操作" width="150" fixed="right">
                    <template #default="scope">
                        <t-button variant="outline" size="small" @click="handleEditBtn(scope.row)">编辑</t-button>
                        <t-popconfirm content="确认删除吗" @confirm="flightPlanStore.deleteData([scope.row.id])" theme="danger"
                            placement="bottom">
                            <t-button variant="outline" size="small" theme="danger">删除</t-button>
                        </t-popconfirm>
                        <t-button variant="outline" size="small" theme="warning"
                            @click="handleTransferBtn(scope.row)">转单</t-button>

                    </template>
                </el-table-column>

            </el-table>
        </el-scrollbar>
        <t-pagination style="margin-top: 10px;" v-model="flightPlanStore.currentPage"
            v-model:pageSize="flightPlanStore.pageSize" :total="flightPlanStore.pageDataSum" show-jumper
            @page-size-change="flightPlanStore.fetchPageData" @current-change="flightPlanStore.fetchPageData" />
    </div>
    <flightPlanDataEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
    <transferFlightPlanPanel :visible="transferVisible" @update:visible="handleTransferVisibleChange" />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
    flightPlanStore, flightPlanEditFormData, flightPlanTransferData, efpsData, flightInfoData, 
} from '@/stores/flightPlan-store'
import flightPlanDataEdit from './flightPlanDataEdit.vue';
import transferFlightPlanPanel from './transferFlightPlanPanel.vue';
import { formatDate3 } from '@/utils/moment';


const editVisible = ref(false)
const transferVisible = ref(false)
const airport = ref(import.meta.env.AIRPORT_CODE)

const handleEditVisibleChange = () => {
    editVisible.value = !editVisible.value
}
const handleTransferVisibleChange = () => {
    transferVisible.value = !transferVisible.value
}

const handleEditBtn = (row: any) => {
    handleEditVisibleChange()
    flightPlanEditFormData.value = { ...row }

}
const handleTransferBtn = (row: any) => {
    handleTransferVisibleChange()
    flightPlanTransferData.value = { ...row }

    // 转进程单
    efpsData.value.a1 = flightPlanTransferData.value.flightNumber
    efpsData.value.b1 = flightPlanTransferData.value.aircraftType
    efpsData.value.e1 = flightPlanTransferData.value.departureAirport
    efpsData.value.h1 = flightPlanTransferData.value.arrivalAirport
    if (flightPlanTransferData.value.arrivalAirport == airport.value) {
        efpsData.value.fg1 = formatDate3(flightPlanTransferData.value.scheduledArrivalTime as any)
    } else {
        efpsData.value.fg1 = formatDate3(flightPlanTransferData.value.scheduledDepartureTime as any)
    }
    efpsData.value.e4 = flightPlanTransferData.value.stand
    // 转航班信息
    flightInfoData.value.flightNumber = flightPlanTransferData.value.flightNumber
    flightInfoData.value.arrivalAirport = flightPlanTransferData.value.arrivalAirport
    flightInfoData.value.departureAirport = flightPlanTransferData.value.departureAirport
    flightInfoData.value.scheduledArrivalTime = flightPlanTransferData.value.scheduledArrivalTime
    flightInfoData.value.scheduledDepartureTime = flightPlanTransferData.value.scheduledDepartureTime
    flightInfoData.value.aircraftType = flightPlanTransferData.value.aircraftType
}


</script>
<style scoped>
.table-container {
    margin-bottom: 10px;
}

.table-style {
    height: 400px;
}
</style>