<template>
    <div class="wrap">
        <el-table :data="tableData" style="height: 220px;border-radius: 5px;font-size: small;">
            <el-table-column prop="name" label="停机位" width="70" />
            <el-table-column prop="status" label="状态" width="70">
                <template #default="scope">
                    <el-tag :type="scope.row.status === '0' ? 'success' : scope.row.status === '1' ? 'warning' : 'danger'" >
                        {{ scope.row.status === '0' ? '空闲' : scope.row.status === '1' ? '占用' : '维修' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="飞机类型" width="100" />
            <el-table-column prop="company" label="航空公司" width="80" />
            <el-table-column prop="arn" label="飞机注册号" width="120" />
            <el-table-column prop="atime" label="计划到达时间" width="110" />
            <el-table-column prop="ltime" label="计划离开时间" width="110" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([
    {
        name: 'A1',
        status: '0',
        type: 'Boeing 737',
        company: '中国国航',
        arn: 'B-1234',
        atime: '14:00',
        ltime: '16:30'
    },
    {
        name: 'A2',
        status: '0',
        type: 'Airbus A320',
        company: '东方航空',
        arn: 'B-5678',
        atime: '15:00',
        ltime: '17:30'
    },
    {
        name: 'B1',
        status: '1',
        type: 'Boeing 777',
        company: '南方航空',
        arn: 'B-9012',
        atime: '13:45',
        ltime: '18:00'
    },
    {
        name: 'B2',
        status: '2',
        type: 'Boeing 787',
        company: '厦门航空',
        arn: 'B-3456',
        atime: '12:30',
        ltime: '15:00'
    },
    {
        name: 'C1',
        status: '0',
        type: 'Airbus A350',
        company: '海南航空',
        arn: 'B-7890',
        atime: '16:00',
        ltime: '19:30'
    }
]);
</script>

<style lang="scss" scoped>
.wrap {
    margin-top: 5px;
    display: flex;
    justify-content: center;
}
</style>
