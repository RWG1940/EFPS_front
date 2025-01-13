<template>
    <div class="aircraftStatus">
        <t-icon name="activity"></t-icon>飞行器状态
        <div style="background-color:beige;padding: 5px;border-radius: 10px;">
            <t-row>
                <t-col :span="3">呼号: <span>{{ nowProcessingData[0]?.a1 || 'N/A' }}</span></t-col>
                <t-col :span="3">机型: <span>{{ nowProcessingData[0]?.b1 || 'N/A' }}</span></t-col>
                <t-col :span="6">预计到达/离开时间: <span>{{ nowProcessingData[0]?.fg1 || 'N/A' }}</span></t-col>


            </t-row>
            <t-row>
                <t-col :span="4">状态:
                    <el-tag v-if="nowProcessingData[0]?.type === 0" type="success" effect="dark">准备起飞</el-tag>
                    <el-tag v-else-if="nowProcessingData[0]?.type === 1" type="warning" effect="dark">准备降落</el-tag>
                    <span v-else>N/A</span>
                </t-col>
                <t-col :span="8">状态更新时间: <span>{{ formatDate(nowProcessingData[0]?.updatetime || '') || 'N/A'
                }}</span></t-col>
            </t-row>
            <t-row>
                <t-col>管制指令:
                
                    高度：<span>{{ nowProcessingData[0]?.b2 }}</span>
                    其他：<span>{{ nowProcessingData[0]?.c2 }}</span>
                </t-col>
            </t-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nowProcessingData } from '@/stores/towerEfps-store';
import { formatDate } from '@/utils/moment';

</script>

<style lang="scss" scoped>
.aircraftStatus {
    background-color: rgba(255, 255, 255, 0.594);
    padding: 5px;
    border-radius: 5px;
    margin-top: 10px;
}

.t-row {
    background-color: beige;
    padding: 5px;
    border-radius: 10px;
}

span {
    font-weight: bolder;
}
</style>
