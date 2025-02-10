<template>
        <div class="control-center">
        <t-row style="justify-content: center;">
            <div style="margin-top: 0px;margin-bottom: 2px;font-weight: bold;"><t-icon name="command" class="r-icon"></t-icon>控制中心</div>
        </t-row>
        <t-row>
            <el-scrollbar height="320px" style="border-radius: 5px;">
                <processing />
                <aircraftStatus />
            </el-scrollbar>
        </t-row>
        <t-row>
            <operations />
        </t-row>
    </div>
</template>
<script lang="ts" setup>
import processing from './rightControlCenter/processing.vue';
import operations from './rightControlCenter/operations.vue';
import aircraftStatus from './rightControlCenter/aircraftStatus.vue';

</script>
<style lang="scss" scoped>
.control-center {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    padding: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition-duration: 0.5s;
}

.control-center:hover {
    transition-duration: 0.5s;
    box-shadow: 1px 1px 10px grey;
}
.r-icon {
    // 让它一直旋转
    animation: spin 3s linear infinite;
    margin-right: 5px;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>