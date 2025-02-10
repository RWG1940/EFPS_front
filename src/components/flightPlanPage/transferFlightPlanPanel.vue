<template>
    <userEdit :visible="visible" header="转单面板" @update:visible="handleTransferVisibleChange">
        <template #main>
            <t-row>
                <p>📝该飞行计划可转单为：</p>
            </t-row>
            <t-row>
                <el-tag>{{ flightPlanTransferData.arrivalAirport == airport ? '进港进程单' : '离港进程单'
                }}</el-tag>
            </t-row>
            <t-row v-if="flightPlanTransferData.arrivalAirport == airport">
                <areaEfps BackgroundColor="antiquewhite" :efps-data="efpsData" />
            </t-row>
            <t-row v-if="flightPlanTransferData.arrivalAirport != airport">
                <releaseGroundEfps BackgroundColor="antiquewhite" :efps-data="efpsData" />
            </t-row>
            <t-row>
                <el-tag type="info">航班信息</el-tag>
            </t-row>
            <t-row>
                <t-card>
                    <t-row>
                        <t-col :span="6">航班号：{{ flightInfoData.flightNumber }} </t-col>
                        <t-col :span="6">机型：{{ flightInfoData.aircraftType }} </t-col>
                        
                    </t-row>
                    <t-row>
                        <t-col :span="6">出发机场：{{ flightInfoData.departureAirport }} </t-col>
                        <t-col :span="6">到达机场：{{ flightInfoData.arrivalAirport }} </t-col>

                    </t-row>
                    <t-row>
                        <t-col :span="6">计划起飞时间：{{ flightInfoData.scheduledDepartureTime }} </t-col>
                        <t-col :span="6">计划降落时间：{{ flightInfoData.scheduledArrivalTime }} </t-col>
                    </t-row>
                    <t-row>
                        <t-col :span="6">实际起飞时间：{{ flightInfoData.actualDepartureTime }} </t-col>
                        <t-col :span="6">实际降落时间：{{ flightInfoData.actualArrivalTime }} </t-col>
                    </t-row>
                    <t-row>
                        以下信息需手动填写：
                        <t-col>航空公司：<t-input v-model="flightInfoData.airline" clearable></t-input></t-col>
                    </t-row>
                </t-card>
            </t-row>


        </template>
        <template #footer>
            <t-button theme="primary" type="submit" @click="transferButton" block>确认转单</t-button>
            <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
        </template>
    </userEdit>
</template>

<script lang="ts" setup>
import userEdit from '../userManage/userEdit.vue';
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next';
import { flightPlanStore, flightPlanTransferData,efpsData,flightInfoData } from '@/stores/flightPlan-store'
import areaEfps from '../areaControlPage/areaEfps.vue';
import releaseGroundEfps from '../releaseGroundControlPage/releaseGroundEfps.vue';
import { areaEfpsStore } from '@/stores/areaEfps-store';
import { releaseGroundEfpsStore } from '@/stores/releaseGroundEfps-store';
import { flightInfoStore } from '@/stores/flightInfo-store';
import { flightParkingStandStore } from '@/stores/flightParkingStand-store';
import { parkingStandStore } from '@/stores/parkingStand-store';


const airport = ref(import.meta.env.AIRPORT_CODE)
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleTransferVisibleChange = () => {
    emit('update:visible');
};

const cancelButton = () => {
    handleTransferVisibleChange();
};
const transferButton = () => {
    // 添加进程单
    if (flightPlanTransferData.value.arrivalAirport == airport.value) {
        efpsData.value.status = 1 // 进港
        areaEfpsStore.addData(efpsData)
    } else {
        efpsData.value.status = 0 // 出港
        // 添加航班停机位关联表
        // 根据停机位编码找出停机位id
        parkingStandStore.data.forEach((parkingStand: any) => {
            if (parkingStand.code == efpsData.value.e4) {
                efpsData.value.e4 = parkingStand.id
            }
        })
        flightParkingStandStore.addData({
            parkingStandId: efpsData.value.e4,
            flightId: flightInfoData.value.flightNumber
        })
        releaseGroundEfpsStore.addData(efpsData)
    }
    // 添加航班信息
    flightInfoStore.addData(flightInfoData)
    handleTransferVisibleChange();
};


</script>
<style scoped>

</style>