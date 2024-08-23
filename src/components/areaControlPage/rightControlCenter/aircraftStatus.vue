<template>
    <div class="aircraftStatus">
        <t-icon name="activity"></t-icon>飞行器状态
        <div style="background-color:beige;padding: 5px;border-radius: 10px;">
            <t-row>
                <t-col :span="4">航班号:1234</t-col>
                <t-col :span="4">飞行器类型:65</t-col>
                <t-col :span="4">当前状态:ok</t-col>
            </t-row>
            <t-row>
                <t-col :span="6">状态更新时间:</t-col>
                <t-col :span="6">详细描述</t-col>
            </t-row>
            <t-row>
                <t-col :span="6">管制指令:</t-col>
                <t-col :span="6">预计到达/离开时间:</t-col>
            </t-row>
        </div>
    </div>
</template>
<script lang="ts" setup>

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
</style>