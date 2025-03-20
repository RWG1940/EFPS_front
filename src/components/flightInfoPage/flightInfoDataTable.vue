<template>
    <div class="table-container">
        <el-scrollbar style="width: 1250px;">
            <el-table :data="flightInfoStore.dataPages" class="table-style"
                @selection-change="flightInfoStore.handleSelectionChange" border>
                <el-table-column type="selection" width="40" fixed />
                <el-table-column label="航班号" prop="flightNumber" fixed width="100" show-overflow-tooltip />

                <el-table-column label="航空公司" prop="airline" width="120" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column label="机型" prop="aircraftType" width="100" show-overflow-tooltip />
                <el-table-column label="起降机场" prop="departureAirport" width="100" show-overflow-tooltip />
                <el-table-column label="目的机场" prop="arrivalAirport" width="100" show-overflow-tooltip />
                <el-table-column label="计划起飞时间" prop="scheduledDepartureTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="计划到达时间" prop="scheduledArrivalTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="状态" prop="flightStatus" width="100" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag
                            :theme="scope.row.flightStatus == 0 ? 'primary' : scope.row.flightStatus ==
                            1 ? 'success' : scope.row.flightStatus == 2 ? 'success' : scope.row.flightStatus == 3 ?'warning':'danger'">{{
                                scope.row.flightStatus == 0 ? '候机' : scope.row.flightStatus ==
                                    1 ? '起飞' : scope.row.flightStatus == 2 ? '降落' : scope.row.flightStatus == 3 ? '延误' : '取消'
                            }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="航路信息" prop="route" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="实际起飞时间" prop="actualDepartureTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="实际到达时间" prop="actualArrivalTime" width="140" show-overflow-tooltip sortable />
                <el-table-column label="当前高度" prop="altitude" width="100" show-overflow-tooltip />
                <el-table-column label="当前速度" prop="speed" width="100" show-overflow-tooltip />
                <el-table-column label="当前经纬度坐标" prop="position" width="140" show-overflow-tooltip />
                <el-table-column label="备注" prop="remarks" width="140" show-overflow-tooltip />


                <el-table-column label="操作" width="150" fixed="right">
                    <template #default="scope">
                        <t-button variant="outline" size="small" @click="handleEditBtn(scope.row)">编辑</t-button>
                        <t-popconfirm content="确认删除吗，该操作不可逆" @confirm="flightInfoStore.deleteData([scope.row.id])"
                            theme="danger" placement="bottom">
                            <t-button variant="outline" size="small" theme="danger">删除</t-button>
                        </t-popconfirm>
                    </template>
                </el-table-column>

            </el-table>
        </el-scrollbar>
        <t-pagination style="margin-top: 10px;" v-model="flightInfoStore.currentPage"
            v-model:pageSize="flightInfoStore.pageSize" :total="flightInfoStore.pageDataSum" show-jumper
            @page-size-change="flightInfoStore.fetchPageData" @current-change="flightInfoStore.fetchPageData" />
    </div>
    <flightInfoDataEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { flightInfoStore, flightInfoEditFormData } from '../../stores/flightInfo-store'
import flightInfoDataEdit from './flightInfoDataEdit.vue'


const editVisible = ref(false)
const transferVisible = ref(false)

const handleEditVisibleChange = () => {
    editVisible.value = !editVisible.value
}
const handleTransferVisibleChange = () => {
    transferVisible.value = !transferVisible.value
}

const handleEditBtn = (row: any) => {
    handleEditVisibleChange()
    flightInfoEditFormData.value = { ...row }

}

</script>
<style scoped>
.table-container {
    margin-bottom: 10px;
}

.table-style {
    height: 400px;
}</style>