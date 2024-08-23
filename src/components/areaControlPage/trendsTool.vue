<template>
    <div class="trendsTool">
    <el-row>
        <el-col :span="12" >
            <div class="left1">
                <t-icon name="task"></t-icon> 航班动态
                <aircraftsTrends/>
            </div>
        </el-col>
        <el-col :span="12" >
            <div class="right1">
                <t-icon name="cloud"></t-icon> 空域动态
                <t-button theme="default" size="small" style="margin-left: 60px;"><t-icon name="swap"></t-icon>空域概览</t-button>
                <t-button theme="default" size="small" style="margin-left: 5px;"><t-icon name="swap"></t-icon>空域天气</t-button>
                <t-button theme="default" size="small" style="margin-left: 5px;"><t-icon name="swap"></t-icon>空域航班</t-button>
                <t-button theme="default" size="small" style="margin-left: 5px;"><t-icon name="swap"></t-icon>图形数据</t-button>
                <airspace/>
            </div>
        </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
        <el-col :span="12" >
            <div class="left2">
                <t-icon name="map"></t-icon> 跑道动态
                <runway/>
            </div>
        </el-col>
        <el-col :span="12" >
            <div class="right2" >
                <t-icon name="location-parking-place"></t-icon> 停机位动态
                <parkingplace/>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script lang="ts" setup>
import airspace from './trendsTool/airspace.vue'
import parkingplace from './trendsTool/parkingplace.vue'
import runway from './trendsTool/runway.vue'
import aircraftsTrends from './trendsTool/aircraftsTrends.vue'


</script>
<style scoped>

.left1 {
    margin-left: 10px;
    width: 480px;
    height: 350px;
    background-color: white;
    border-radius: 15px;
    padding: 8px;
    transition-duration: 0.5s;
}
.left1:hover {
    box-shadow: 1px 1px 5px grey;
}
.right1 {
    width: 480px;
    height: 350px;
    background-color: white;
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
}
.right1:hover {
    box-shadow: 1px 1px 5px grey;
}
.left2 {
    margin-left: 10px;
    width: 480px;
    height: 250px;
    background-color: white;
    border-radius: 15px;
    padding: 8px;
    transition-duration: 0.5s;
}
.left2:hover {
    box-shadow: 1px 1px 5px grey;
}
.right2 {
    width: 480px;
    height: 250px;
    background-color: white;
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
}
.right2:hover {
    box-shadow: 1px 1px 5px grey;
}
    
</style>