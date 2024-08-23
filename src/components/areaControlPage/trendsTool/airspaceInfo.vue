<template>
    <div class="wrap">
        <el-row>
            <el-col :span="6">
                <p class="p-content">流量:<span style="background-color: green;color: white;">低</span></p>
            </el-col>
            <el-col :span="6">
                <p class="p-content">数量:2</p>
            </el-col>
            <el-col :span="12">
                <p class="p-content">告警:<span style="background-color: rgb(255, 0, 0);color: white;">受限：5</span></p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <p class="p-content">风速:15m/s</p>
            </el-col>
            <el-col :span="12">
                <p class="p-content">风向:270°</p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <p class="p-content">能见度:5km</p>
            </el-col>
            <el-col :span="12">
                <p class="p-content">云高层高度:1500m</p>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>

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