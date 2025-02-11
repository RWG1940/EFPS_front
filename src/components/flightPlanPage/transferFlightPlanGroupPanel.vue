<template>
    <userEdit :visible="visible" header="转单面板" @update:visible="handleTransferVisibleChange">
        <template #main>
            <t-row>
                <p>📝选中的{{ flightPlanTransferDataGroup.length }}条飞行计划可转单为：</p>
            </t-row>
            <t-list style="position: relative; height: 480px; overflow-y: scroll">
                <!-- 并行遍历三组数据 -->
                <div v-for="index in Math.max(flightPlanTransferDataGroup.length, flightInfoDataGroup.length, efpsDataGroup.length)"
                    :key="index">
                    <p style="display: flex;justify-content: center;align-items: center;font-style: italic;">---------- 数据{{
                        index }} ----------</p>
                    <!-- 显示 flightPlanTransferData -->
                    <t-row>
                        <el-tag>{{ flightPlanTransferDataGroup[index - 1]?.arrivalAirport == airport ? '进港进程单' : '离港进程单'
                        }}</el-tag>
                    </t-row>
                    <t-row v-if="flightPlanTransferDataGroup[index - 1]?.arrivalAirport == airport">
                        <areaEfps BackgroundColor="antiquewhite" :efps-data="efpsDataGroup[index - 1] || {}" />
                    </t-row>
                    <t-row v-if="flightPlanTransferDataGroup[index - 1]?.arrivalAirport != airport">
                        <releaseGroundEfps BackgroundColor="antiquewhite" :efps-data="efpsDataGroup[index - 1] || {}" />
                    </t-row>

                    <!-- 显示 flightInfoData -->
                    <t-row>
                        <el-tag type="info">航班信息</el-tag>
                    </t-row>
                    <t-row>
                        <t-card>
                            <t-row>
                                <t-col :span="6">航班号：{{ flightInfoDataGroup[index - 1]?.flightNumber }} </t-col>
                                <t-col :span="6">机型：{{ flightInfoDataGroup[index - 1]?.aircraftType }} </t-col>
                            </t-row>
                            <t-row>
                                <t-col :span="6">出发机场：{{ flightInfoDataGroup[index - 1]?.departureAirport }} </t-col>
                                <t-col :span="6">到达机场：{{ flightInfoDataGroup[index - 1]?.arrivalAirport }} </t-col>
                            </t-row>
                            <t-row>
                                <t-col :span="6">计划起飞时间：{{ flightInfoDataGroup[index - 1]?.scheduledDepartureTime }}
                                </t-col>
                                <t-col :span="6">计划降落时间：{{ flightInfoDataGroup[index - 1]?.scheduledArrivalTime }} </t-col>
                            </t-row>
                            <t-row>
                                <t-col :span="6">实际起飞时间：{{ flightInfoDataGroup[index - 1]?.actualDepartureTime }} </t-col>
                                <t-col :span="6">实际降落时间：{{ flightInfoDataGroup[index - 1]?.actualArrivalTime }} </t-col>
                            </t-row>

                        </t-card>
                    </t-row>
                    <t-row>
                        以下信息需手动填写：
                        <t-col>航空公司：<t-input v-model="flightInfoDataGroup[index - 1].airline" clearable></t-input></t-col>
                    </t-row>
                </div>
            </t-list>
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
import { flightPlanStore, flightPlanTransferData, efpsData, flightInfoData, flightPlanTransferDataGroup, flightInfoDataGroup, efpsDataGroup } from '@/stores/flightPlan-store'
import areaEfps from '../areaControlPage/areaEfps.vue';
import releaseGroundEfps from '../releaseGroundControlPage/releaseGroundEfps.vue';
import { areaEfpsStore } from '@/stores/areaEfps-store';
import { releaseGroundEfpsStore } from '@/stores/releaseGroundEfps-store';
import { flightInfoStore } from '@/stores/flightInfo-store';
import { flightParkingStandStore } from '@/stores/flightParkingStand-store';
import { parkingStandStore } from '@/stores/parkingStand-store';
import { AIRPORT_CODE, AIRPORT_NAME } from '@/config/config'
import type { FlightInfo } from '@/types/flightInfoTypes';

const airport = ref(AIRPORT_CODE)
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

    flightPlanTransferDataGroup.value.forEach((flightPlan, index) => {
        const currentEfpsData = efpsDataGroup.value[index]; // 获取对应的 efpsData
        const currentFlightInfoData = flightInfoDataGroup.value[index] as FlightInfo; // 获取对应的 flightInfoData

        // 根据 arrivalAirport 判断是进港还是出港
        if (flightPlan.arrivalAirport == airport.value) {
            // 进港
            currentEfpsData.type = 1;
            currentEfpsData.status = 1;
            areaEfpsStore.addData(currentEfpsData);  // 添加到进港的进程单
        } else {
            // 出港
            currentEfpsData.type = 0;
            currentEfpsData.status = 1;
            // 添加到出港的进程单
            releaseGroundEfpsStore.addData(currentEfpsData);
            // 根据停机位编码找出停机位id并更新 efpsData
            parkingStandStore.data.forEach((parkingStand: any) => {
                if (parkingStand.code == currentEfpsData.e4) {
                    currentEfpsData.e4 = parkingStand.id;  // 更新为停机位id
                }
            });
            if (currentEfpsData.e4 == null) {
                return
            }
            // 添加航班信息
            flightInfoStore.addData(currentFlightInfoData).then(() => {
                flightInfoStore.searchData({
                    flightNumber: currentFlightInfoData.flightNumber
                }).then(() => {
                    const flightInfoData = flightInfoStore.searchResultData as FlightInfo[];
                    flightParkingStandStore.addData({
                        parkingStandId: currentEfpsData.e4,
                        flightId: flightInfoData[0].id
                    });
                    // 将停机位设置为被占用
                    parkingStandStore.updateData({
                        id: currentEfpsData.e4,
                        status: 1
                    })
                })
            })

            
        }
        // 将该航空计划状态转为进行中
        flightPlanStore.updateData({
            id: flightPlan.id,
            status: 1
        });

    });

    // 关闭转单面板
    handleTransferVisibleChange();
};
onMounted(() => {
    parkingStandStore.fetchAllData();

})

</script>
<style scoped></style>