<template>
    <div class="wrap">
        <el-row>
            <el-col :span="6">
                <p class="p-content">流量:<span>{{ data.flow }}</span></p>
            </el-col>
            <el-col :span="6">
                <p class="p-content">数量:{{ data.quantity }}</p>
            </el-col>
            <el-col :span="12">
                <p class="p-content">管制:<span>{{ status }}</span></p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <p class="p-content">风速:{{ data.windSpeed }}m/s</p>
            </el-col>
            <el-col :span="12">
                <p class="p-content">风向:{{ data.windDirection }}°</p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <p class="p-content">能见度:{{ data.visibility }}km</p>
            </el-col>
            <el-col :span="12">
                <p class="p-content">云高层高度:{{ data.ceiling }}m</p>
            </el-col>
        </el-row>

    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type{ AirspaceInfoData } from '@/stores/airspaceInfo-store'

// 定义prop接收
const props = defineProps({
    data: {
        type: Object as () => AirspaceInfoData,
        default: () => ({})
    },
    status: {
        type: String,
        default: ''
    }
})
</script>
<style lang="scss" scoped>
.wrap {
    margin: 0;
}
.p-content {
    margin: 0;
    font-size: small;
}
</style>