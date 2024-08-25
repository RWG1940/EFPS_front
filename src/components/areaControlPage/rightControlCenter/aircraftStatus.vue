<template>
    <div class="aircraftStatus">
        <t-icon name="activity"></t-icon>飞行器状态
        <div style="background-color:beige;padding: 5px;border-radius: 10px;">
            <t-row>
                <t-col :span="3">呼号: <span>{{ store.processingData[0]?.a1 || 'N/A' }}</span></t-col>
                <t-col :span="3">机型: <span>{{ store.processingData[0]?.b1 || 'N/A' }}</span></t-col>
                <t-col :span="6">预计到达/离开时间: <span>{{ store.processingData[0]?.fg1 || 'N/A' }}</span></t-col>

                
            </t-row>
            <t-row>
                <t-col :span="4">状态:
                    <el-tag v-if="store.processingData[0]?.type === 0" type="success" effect="dark">准备起飞</el-tag>
                    <el-tag v-else-if="store.processingData[0]?.type === 1" type="warning" effect="dark">准备降落</el-tag>
                    <span v-else>N/A</span>
                </t-col>
                <t-col :span="8">状态更新时间: <span>{{ formatDate(store.processingData[0]?.updatetime || '') || 'N/A' }}</span></t-col>
            </t-row>
            <t-row>

                <t-col :span="6">管制指令:</t-col>
                
            </t-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useareaEfpsStore } from '@/stores/areaEfps-store';
import { formatDate } from '@/utils/moment';

const store = useareaEfpsStore();
</script>

<style lang="scss" scoped>
.aircraftStatus {
    background-color: rgba(220, 220, 220, 0.594);
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
