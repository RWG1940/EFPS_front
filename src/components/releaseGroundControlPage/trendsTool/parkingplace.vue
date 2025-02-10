<template>
    <div class="wrap">
        <el-table :data="mergedData" style="height: 250px; border-radius: 5px; font-size: small;" stripe>
            <el-table-column prop="code" label="停机位编号" width="100" show-overflow-tooltip />
            <el-table-column prop="size" label="大小" width="70" show-overflow-tooltip>
                <template #default="{ row }">
                    <el-tag effect="plain" round>{{ row.size == 1 ? '小型' : row.size == 2 ? '中型' : '大型' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="70" show-overflow-tooltip>
                <template #default="scope"><el-tag
                        :type="scope.row.status == '0' ? 'success' : scope.row.status == '1' ? 'warning' : 'danger'">{{
                            scope.row.status == '0' ? '空闲' : scope.row.status == '1' ? '被占用' : '已禁用' }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="location" label="位置" width="100" show-overflow-tooltip />
            <el-table-column prop="flightNumber" label="航班号" width="100" show-overflow-tooltip />
            <el-table-column prop="aircraftType" label="机型" width="100" show-overflow-tooltip />
            <el-table-column prop="airline" label="航空公司" width="140" show-overflow-tooltip />
            <el-table-column prop="plannedArrival" label="计划到达时间" width="150" show-overflow-tooltip />
            <el-table-column prop="plannedDeparture" label="计划起飞时间" width="150" show-overflow-tooltip />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { parkingStandStore } from '@/stores/parkingStand-store';
import { flightInfoStore } from '@/stores/flightInfo-store';
import { flightParkingStandStore } from '@/stores/flightParkingStand-store';

onMounted(() => {
    parkingStandStore.fetchAllData();
    flightInfoStore.fetchAllData();
    flightParkingStandStore.fetchAllData();
});

// 计算合并后的数据
const mergedData = computed(() => {
    // 遍历停机位数据
    return parkingStandStore.data.map((parkingStand: any) => {
        // 找到与当前停机位关联的航班停机位数据
        const flightParkingStand = flightParkingStandStore.data.find(
            (fps: any) => fps.parkingStandId === parkingStand.id
        ) as any;

        if (flightParkingStand) {
            // 找到与当前航班停机位数据关联的航班信息
            const flightInfo = flightInfoStore.data.find(
                (flight: any) => flight.id === flightParkingStand.flightId
            ) as any;

            if (flightInfo) {
                // 合并数据
                return {
                    ...parkingStand,
                    flightNumber: flightInfo.flightNumber || 'N/A',
                    aircraftType: flightInfo.aircraftType || 'N/A',
                    airline: flightInfo.airline || 'N/A',
                    plannedArrival: flightInfo.scheduledArrivalTime || 'N/A',
                    plannedDeparture: flightInfo.scheduledDepartureTime || 'N/A',
                };
            }
        }

        // 如果没有关联的航班信息，返回原始数据
        return {
            ...parkingStand,
            flightNumber: '无',
            aircraftType: '无',
            airline: '无',
            plannedArrival: '无',
            plannedDeparture: '无',
        };
    });
});
</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    justify-content: center;
}
</style>
