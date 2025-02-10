<template>
    <div class="trendsTool">
        <el-row>
            <el-col :span="12">
                <div class="left1">
                    <t-icon name="task"></t-icon> 航班动态
                    <aircraftsTrends />
                </div>
            </el-col>
            <el-col :span="12">
                <div class="right1">
                    <t-icon name="cloud"></t-icon> 空域动态
                
                    <div style="height: 310px;margin-top: 10px;">
                        <el-scrollbar hight="350px" style="border-radius: 10px;">
                            <airspace />
                        </el-scrollbar>
                    </div>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script lang="ts" setup>
import airspace from '@/components/areaControlPage/trendsTool/airspace.vue'
import aircraftsTrends from '@/components/areaControlPage/trendsTool/aircraftsTrends.vue'


</script>
<style scoped>
.left1 {
    margin-left: 10px;
    width: 480px;
    height: 350px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    padding: 8px;
    transition-duration: 0.5s;
}

.left1:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
}

.right1 {
    width: 480px;
    height: 350px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
}

.right1:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
}

.left2 {
    margin-left: 10px;
    width: 480px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    padding: 8px;
    transition-duration: 0.5s;
}

.left2:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
}

.right2 {
    width: 480px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(15px);
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
}

.right2:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
}
</style>