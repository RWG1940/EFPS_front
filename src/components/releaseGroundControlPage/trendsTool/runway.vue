<template>
    <div class="wrap">
        <t-list class="runwayList">
            <div v-for="item in store.data" :key="item.id">
                <t-row style="margin: 5px;">
                    <t-col :span="3">
                        跑道号：<el-tag round>{{ item.code }}</el-tag>
                    </t-col>
                    <t-col :span="3">
                        长度：<el-tag round>{{ item.length }}</el-tag>
                    </t-col>
                    <t-col :span="3">
                        宽度：<el-tag round>{{ item.width }}</el-tag>
                    </t-col>
                    <t-col :span="3">
                        材质：<el-tag type="info" round>{{ item.surfaceType }}</el-tag>
                    </t-col>
                </t-row>
                <div class="runway">
                    <div v-if="hasPlane(item.id)" class="plane">
                        <el-tag style="margin-left: 80px;" type="warning">当前状态：，预计离开时间：</el-tag>
                    </div>
                    <el-row v-if="hasPlane(item.id)" style="margin-top: 5px;">
                        <el-tag type="danger" round effect="dark">占用</el-tag>
                        <el-tag type="info" effect="dark">呼号：，航班号：，机型：，航空公司：</el-tag>
                    </el-row>
                    <el-tag v-if="!hasPlane(item.id)" round type="success" effect="dark">空闲</el-tag>
                </div>
                
            </div>
        </t-list>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { runwayStore, useRunwayStore } from '@/stores/runway-store';
import { flightRunwayStore } from '@/stores/flightRunway-store';


const store = useRunwayStore();

onMounted(() => {
    runwayStore.fetchAllData(); 
    flightRunwayStore.fetchAllData(); 
});


const hasPlane = (runwayId: number) => {
    return flightRunwayStore.data.some(flight => flight.runwayId === runwayId);
};
</script>

<style lang="scss" scoped>
.runwayList {
    position: relative;
    height: 250px;
    overflow-y: scroll;
    background-color: rgba(255, 255, 255, 0.418);
    border-radius: 5px;
}

.runway {
    margin-top: 4px;
    height: 50px;
    background: url("../../../assets/img/areaControlPage/runway.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
}

.plane {
    height: 20px;
    background: url("../../../assets/img/areaControlPage/plane.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 5px;
    width: 50px;
}
</style>
