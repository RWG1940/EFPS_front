<template>
    <userEdit :visible="visible" header="测试面板" @update:visible="handleTestVisibleChange" :showOverlay="false">
        <template #main>
            <t-row>
                <p>将要移交的进程单：</p>
                <towerEfps :BackgroundColor="prepareBackgroundColor" :efpsData="nowProcessingData[0] || {}" />
            </t-row>
            <t-row>
                <p>航班状态：{{ flightVisible ? '正常💚' : '异常🍅' }}</p>
            </t-row>
            <t-row>
                <p>停机位状态：{{ stopwayVisible ? '正常💚' : '异常🍅' }}</p>
            </t-row>
            <t-row>
                <p>跑道状态：{{ runwayVisible ? '正常💚' : '异常🍅' }}</p>
            </t-row>
            <t-row>
                <p>空域状态：{{ areaVisible ? '正常💚' : '正常💚' }}</p>
            </t-row>
            <t-row :gutter="5">
                <t-col><t-button @click="handleTestBtn">点击测试</t-button></t-col>
                <t-col><t-button @click="delayEfps">发布延误</t-button></t-col>
                <!--<t-col><t-button>及时通讯</t-button></t-col> -->
            </t-row>
        </template>
        <template #footer>
            <t-button theme="default" @click="cancelButton">关闭</t-button>
        </template>
    </userEdit>
</template>
  
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { useTowerEfpsStore, nowProcessingData,delayEfps } from "@/stores/towerEfps-store";
import { ref, reactive, computed, onMounted } from 'vue'
import towerEfps from '../towerEfps.vue';
import { flightInfoStore } from '@/stores/flightInfo-store';
import { runwayStore } from '@/stores/runway-store';
import { parkingStandStore } from '@/stores/parkingStand-store';
import { MessagePlugin } from 'tdesign-vue-next';
import type { RunwayData } from '@/types/runwayTypes';
import type { ParkingStandData } from '@/types/parkingStandTypes';


const flightVisible = ref(false)
const stopwayVisible = ref(false)
const runwayVisible = ref(false)
const areaVisible = ref(false);
const prepareBackgroundColor = ref('lightgrey')
const store = useTowerEfpsStore();
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleTestVisibleChange = () => {
    emit('update:visible');
};
const cancelButton = () => {
    prepareBackgroundColor.value = 'lightgrey'
    flightVisible.value = false
    stopwayVisible.value = false
    runwayVisible.value = false
    areaVisible.value = false
    emit('update:visible');
};
const handleTestBtn = () => {
    flightInfoStore.fetchAllData().then(() => {
         // 根据nowProcessingData.value[0].a1航班号匹配航班信息data的航班并返回航班状态
        const flight = flightInfoStore.data.find((item: any) => item.flightNumber == nowProcessingData.value[0].a1) as any
        if (flight.flightStatus == 3 || flight.flightStatus == 4) {
            prepareBackgroundColor.value = 'red' 
            flightVisible.value = false 
        } else {
            prepareBackgroundColor.value = 'lightskyblue'
            flightVisible.value = true
            
        }    
    })
    parkingStandStore.fetchAllData().then(() => {
       const stopway = parkingStandStore.data.find((item: any) => item.code == nowProcessingData.value[0].e4) as ParkingStandData
        if (stopway.status == 1) {
            prepareBackgroundColor.value = 'lightskyblue'
            stopwayVisible.value = true
        } else {
            prepareBackgroundColor.value = 'red'
            stopwayVisible.value = false
            MessagePlugin.warning(`停机位状态:${ stopway.status }`)
        }
    })
    runwayStore.fetchAllData().then(() => {
        const runway = runwayStore.data.find((item: any) => item.code == nowProcessingData.value[0].de34) as RunwayData
        console.log('跑道状态'+ runway)
        if (runway.status == 1) {
            prepareBackgroundColor.value = 'lightskyblue'
            runwayVisible.value = true
        } else {
            prepareBackgroundColor.value = 'red'
            runwayVisible.value = false
            MessagePlugin.warning(`跑道状态:${ runway.status }`)
        }
    })


};





</script>
<style scoped>

</style>
  