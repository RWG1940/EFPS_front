<template>
    <div class="table-container">
        <el-scrollbar style="width: 1250px;">
            <el-table :data="flightPlanStore.dataPages" class="table-style" @selection-change="flightPlanStore.handleSelectionChange" border>
                <el-table-column type="selection" width="40" fixed />
                <el-table-column label="航班号" prop="flightNumber" fixed width="100" show-overflow-tooltip />
                <el-table-column label="机型" prop="aircraftType" width="100" show-overflow-tooltip />
                <el-table-column label="起降机场" prop="departureAirport" width="100" show-overflow-tooltip />
                <el-table-column label="目的机场" prop="arrivalAirport" width="100" show-overflow-tooltip />
                <el-table-column label="计划起飞时间" prop="scheduledDepartureTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="计划到达时间" prop="scheduledArrivalTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="实际起飞时间" prop="actualDepartureTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="实际到达时间" prop="actualArrivalTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="机型" prop="aircraftType" width="100" show-overflow-tooltip />
                <el-table-column label="停机位" prop="stand" width="100" show-overflow-tooltip />
                <el-table-column label="登机口" prop="gate" width="100" show-overflow-tooltip />
                <el-table-column label="状态" prop="status" width="100" show-overflow-tooltip />
                <el-table-column label="备注" prop="remarks" width="100" show-overflow-tooltip />
                <el-table-column label="操作" width="150" fixed="right">
                    <template #default="scope">
                        <t-button variant="outline" size="small">编辑</t-button>
                        <t-button variant="outline" size="small" theme="danger">删除</t-button>
                        <t-button variant="outline" size="small" theme="warning">转单</t-button>

                    </template>
                </el-table-column>

            </el-table>
        </el-scrollbar>
        <t-pagination style="margin-top: 10px;" v-model="flightPlanStore.currentPage" v-model:pageSize="flightPlanStore.pageSize"
            :total="flightPlanStore.pageDataSum" show-jumper @page-size-change="flightPlanStore.fetchPageData" @current-change="flightPlanStore.fetchPageData" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { flightPlanStore } from '@/stores/flightPlan-store'

onMounted(() => {
    flightPlanStore.fetchPageData()
})
</script>
<style scoped>
.table-container {
    margin-bottom: 10px;
}

.table-style {
    height: 400px;
}
</style>