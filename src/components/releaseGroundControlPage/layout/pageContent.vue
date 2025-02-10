<template>
    <el-row class="content">
        <el-col :span="16">
            <div style="position: relative; height: 620px">
                <t-list class="rwg" style="position: relative; height: 100%; overflow-y: scroll">
                    <el-row style="margin-top: 10px;">
                        <el-col :span="3.5">
                            <p
                                style="margin-top: 0;text-decoration: underline rgba(0, 0, 255, 0.5) 10px;font-weight: bold;margin-left: 10px;">
                                <t-icon name="flight-landing"></t-icon>着陆

                            </p>
                        </el-col>
                        <transition name="ba-trans" appear>
                            <el-col :span="3" class="process">
                                <p style="font-size: xx-small;margin: -11px;"><t-icon name="next"></t-icon>下个着陆</p>
                                <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }"
                                    :percentage="percentage1" :status="'active'" style="font-size: xx-small;" />
                            </el-col>
                        </transition>
                        <transition name="ba-trans" appear>
                            <el-col :span="1.5">
                                <p class="prep">&ensp;🚦队列中</p>
                            </el-col>
                        </transition>
                        <transition name="ba-trans" appear>
                            <el-col :span="1.5">
                                <p class="prep">&ensp;数量：{{ filteredArrivalEfps.length }}</p>
                            </el-col>
                        </transition>

                        <el-col :span="3.5">
                            <p
                                style="margin-top: 0;text-decoration: underline blue 10px;font-weight: bold;margin-left: 200px;">
                                <t-icon name="flight-takeoff"></t-icon>起飞


                            </p>
                        </el-col>
                        <transition name="ba-trans" appear>


                            <el-col :span="3" class="process">
                                <p style="font-size: xx-small;margin: -11px;"><t-icon name="next"></t-icon>下个起飞</p>
                                <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }"
                                    :percentage="percentage2" :status="'active'" style="font-size: xx-small;" />
                            </el-col>
                        </transition>
                        <transition name="ba-trans" appear>
                            <el-col :span="1.5">
                                <p class="prep">&ensp;🚦队列中</p>
                            </el-col>
                        </transition>
                        <transition name="ba-trans" appear>
                            <el-col :span="1.5" style="margin-right: 10px;">
                                <p class="prep">&ensp;数量：{{ filteredDepartureEfps.length }}</p>
                            </el-col>
                        </transition>
                        <transition name="bt-trans" appear>
                            <t-button class="rround" theme="default" shape="circle" @click="refreshDataBtn"
                                style="margin-left: 10px;"><t-icon name='refresh'></t-icon></t-button>
                        </transition>
                        <transition name="bt-trans" appear>
                            <t-button class="rround" theme="default" shape="circle" @click="handleAddVisibleChange"><t-icon
                                    name='add'></t-icon></t-button>
                        </transition>
                        <transition name="bt-trans" appear>
                            <t-button class="rround" theme="default" shape="circle"
                                @click="handleTableVisibleChange"><t-icon name='fullscreen-2'></t-icon></t-button>
                        </transition>
                        <transition name="bt-trans" appear>
                            <t-button class="rround" theme="default" shape="circle"
                                @click="handleTransferedEfpsDataTableVisibleChange"><t-icon
                                    name='history'></t-icon></t-button>
                        </transition>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <transition name="ar-trans" appear>
                                <div class="arrival-prepare-container">
                                    <t-loading size="small" :loading="loadingVisible" text="数据加载中...">
                                        <el-scrollbar height="250px" style="border-radius: 10px;">
                                            <div v-for="item in filteredArrivalEfps" :key="item.id"
                                                style="display: flex; align-items: center; flex-direction: column;margin-bottom: 10px;">
                                                <t-popconfirm theme="default" content="您想要处理该进程单吗"
                                                    :visible="visibleMap[item.id as number]"
                                                    :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[item.id as number] = false } }"
                                                    :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleEfpsProcessBtn(String(item.id as number)) }">
                                                    <releaseGroundEfps :BackgroundColor="prepareBackgroundColor"
                                                        :efpsData="item || {}"
                                                        @click="togglePopconfirm(String(item.id as number))" />
                                                </t-popconfirm>
                                            </div>
                                            <t-row v-if="filteredArrivalEfps.length == 0">没有进程单数据😬</t-row>
                                            <t-row v-if="filteredArrivalEfps.length == 0">NO DATA FOUND</t-row>
                                        </el-scrollbar>
                                    </t-loading>
                                </div>
                            </transition>

                        </el-col>

                        <el-col :span="12">
                            <transition name="ar-trans" appear>
                                <div class="departure-prepare-container">
                                    <t-loading size="small" :loading="loadingVisible" text="数据加载中...">
                                        <el-scrollbar height="250px" style="border-radius: 10px;">
                                            <div v-for="item in filteredDepartureEfps" :key="item.id"
                                                style="display: flex; align-items: center; flex-direction: column;margin-bottom: 10px;">
                                                <t-popconfirm theme="default" content="您想要处理该进程单吗"
                                                    :visible="visibleMap[item.id as number]"
                                                    :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[item.id as number] = false } }"
                                                    :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleEfpsProcessBtn(String(item.id as number)) }">
                                                    <releaseGroundEfps :BackgroundColor="prepareBackgroundColor"
                                                        :efpsData="item || {}"
                                                        @click="togglePopconfirm(String(item.id as number))" />
                                                </t-popconfirm>
                                            </div>
                                            <t-row v-if="filteredDepartureEfps.length == 0">没有进程单数据😬</t-row>
                                            <t-row v-if="filteredDepartureEfps.length == 0">NO DATA FOUND</t-row>
                                        </el-scrollbar>
                                    </t-loading>
                                </div>
                            </transition>
                        </el-col>

                    </el-row>
                    <el-row style="margin-top: 5px;">
                        <el-col :span="3.5">
                            <p
                                style="margin-top: 0;text-decoration: underline rgba(0, 0, 255, 0.5) 10px;font-weight: bold;margin-left: 10px;">
                                <t-icon name="map-information-1"></t-icon>跑道
                            </p>
                        </el-col>
                        <el-col :span="10">
                            <transition name="bt-trans" appear>
                                <t-button class="rround" theme="default" shape="circle" @click="refreshRunwayDataBtn"
                                    style="margin-left: 10px;"><t-icon name='refresh'></t-icon></t-button>
                            </transition>
                            <transition name="bt-trans" appear>
                                <t-button class="rround" theme="default" shape="circle"
                                    @click="handleAddRunwayVisibleChange"><t-icon name='add'></t-icon></t-button>
                            </transition>
                            <transition name="bt-trans" appear>
                                <t-button class="rround" theme="default" shape="circle"
                                    @click="handleRunwayTableVisibleChange"><t-icon name='fullscreen-2'></t-icon></t-button>
                            </transition>

                        </el-col>
                        <el-col :span="3.5">
                            <p
                                style="margin-top: 0;text-decoration: underline rgba(0, 0, 255, 0.5) 10px;font-weight: bold;margin-left: 50px;">
                                <t-icon name="location-parking-place"></t-icon>停机位
                            </p>
                        </el-col>
                        <el-col :span="4">
                            <transition name="bt-trans" appear>
                                <t-button class="rround" theme="default" shape="circle" @click="refreshParkingDataBtn"
                                    style="margin-left: 10px;"><t-icon name='refresh'></t-icon></t-button>
                            </transition>
                            <transition name="bt-trans" appear>
                                <t-button class="rround" theme="default" shape="circle"
                                    @click="handleAddParkingVisibleChange"><t-icon name='add'></t-icon></t-button>
                            </transition>
                            <transition name="bt-trans" appear>
                                <t-button class="rround" theme="default" shape="circle"
                                    @click="handleParkingStandTableVisibleChange"><t-icon
                                        name='fullscreen-2'></t-icon></t-button>
                            </transition>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <transition name="ar-trans" appear>
                                <div class="arrival-prepare-container">
                                    <t-loading size="small" :loading="loadingRunwayVisible" text="数据加载中...">
                                        <runway />
                                    </t-loading>
                                </div>
                            </transition>
                        </el-col>
                        <el-col :span="12">
                            <transition name="ar-trans" appear>
                                <div class="arrival-prepare-container">
                                    <t-loading size="small" :loading="loadingParkingVisible" text="数据加载中...">
                                        <parkingplace />
                                    </t-loading>
                                </div>
                            </transition>
                        </el-col>

                    </el-row>
                    <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;margin-left: 10px;">
                        <t-icon name="desktop-1"></t-icon>动态
                        <t-button class="rround" theme="default" shape="circle" @click="refreshTrendsBtn"><t-icon
                                name='refresh'></t-icon></t-button>
                    </p>
                    <el-row>
                        <t-loading :loading="trendsLoadingVisible" text="动态刷新中...">
                            <trendsTool />
                        </t-loading>
                    </el-row>
                    <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;margin-left: 10px;">
                        <t-icon name="info-circle"></t-icon>信息
                        <t-button class="rround" theme="default" shape="circle" @click="refreshMsgsBtn"><t-icon
                                name='refresh'></t-icon></t-button>
                    </p>
                    <el-row>
                        <t-loading :loading="msgsLoadingVisible" text="动态刷新中...">
                            <msgTool />
                        </t-loading>
                    </el-row>
                    <el-row
                        style="justify-content: center;color:black;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Powered
                        By JDZU
                        2024</el-row>
                </t-list>
                <t-back-top container=".rwg" :visible-height="500" style="position: absolute" :offset="['24px', '80px']"
                    :duration="500" size="small"></t-back-top>
            </div>
        </el-col>
        <el-col :span="8">
            <transition name="rc-trans" appear>
                <rightControlCenter />
            </transition>
        </el-col>
    </el-row>
    <releaseGroundEfpsDataAdd :visible="addVisible" @update:visible="handleAddVisibleChange" />
    <releaseGroundEfpsDataTable :visible="tableVisible" @update:visible="handleTableVisibleChange" />
    <runwayDataAdd :visible="addRunwayVisible" @update:visible="handleAddRunwayVisibleChange" />
    <runwayDataTable :visible="runwayTableVisible" @update:visible="handleRunwayTableVisibleChange" />
    <parkingStandAdd :visible="addParkingVisible" @update:visible="handleAddParkingVisibleChange" />
    <parkingStandTable :visible="parkingStandTableVisible" @update:visible="handleParkingStandTableVisibleChange" />
    <transferedEfpsDataTable :visible="transferedEfpsDataTableVisible"
        @update:visible="handleTransferedEfpsDataTableVisibleChange" />
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import releaseGroundEfps from '@/components/releaseGroundControlPage/releaseGroundEfps.vue'
import rightControlCenter from '@/components/releaseGroundControlPage/rightControlCenter.vue'
import msgTool from '@/components/towerControlPage/msgTool.vue'
import trendsTool from '@/components/releaseGroundControlPage/trendsTool.vue'
import releaseGroundEfpsDataAdd from '../releaseGroundEfpsDataAdd.vue'
import { useReleaseGroundEfpsStore, filteredArrivalEfps, filteredDepartureEfps, filteredTransferredArrivalEfps, filteredTransferredDepartureEfps, handleEfpsProcess } from '@/stores/releaseGroundEfps-store'
import releaseGroundEfpsDataTable from '../releaseGroundEfpsDataTable.vue'
import runway from '@/components/releaseGroundControlPage/trendsTool/runway.vue'
import parkingStandAdd from '../parkingStandAdd.vue'
import parkingStandTable from '../parkingStandTable.vue'
import parkingplace from '@/components/releaseGroundControlPage/trendsTool/parkingplace.vue'
import { runwayStore } from '@/stores/runway-store'
import runwayDataAdd from '../runwayDataAdd.vue'
import runwayDataTable from '../runwayDataTable.vue'
import { parkingStandStore } from '@/stores/parkingStand-store';
import { flightInfoStore } from '@/stores/flightInfo-store';
import { flightParkingStandStore } from '@/stores/flightParkingStand-store';
import transferedEfpsDataTable from '../transferedEfpsDataTable.vue';
import type { Ref, ComputedRef } from 'vue'
import type { ReleaseGroundEfpsData } from '@/types/releaseGroundEfpsTypes'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import { aircraftsTrendsStore } from '@/stores/aircraftsTrends-store'
import { useAirSpaceEventStore } from '@/stores/airSpaceEvent-store'
import { alertMsgStore } from '@/stores/alertMsg-store'
import { cooperaMsgStore } from '@/stores/cooperaMsg-store'
import { useNoticesStore } from '@/stores/notices-store'
import { usesysMsgStore } from '@/stores/sysMsg-store'

const msgsLoadingVisible = ref(false)
const trendsLoadingVisible = ref(false)
const visibleMap = reactive<{ [key: string]: boolean }>({});
const store = useReleaseGroundEfpsStore()
const addVisible = ref(false)
const prepareBackgroundColor = ref('antiquewhite')
const loadingVisible = ref(false)
const loadingRunwayVisible = ref(false)
const loadingParkingVisible = ref(false)
const tableVisible = ref(false)
const addRunwayVisible = ref(false)
const addParkingVisible = ref(false)
const parkingStandTableVisible = ref(false)
const runwayTableVisible = ref(false)
const transferedEfpsDataTableVisible = ref(false)
const percentage1 = ref(0)
const percentage2 = ref(0)

const calculatePercentage = (efps: ComputedRef<ReleaseGroundEfpsData[]>, percentageRef: Ref<number>) => {
    const now = new Date();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes() + 725;// 提前10分钟处理
    const time = efps.value[0].fg1 as string;
    const targetHour = parseInt(time.slice(0, 2), 10);
    const targetMinute = parseInt(time.slice(2), 10);
    const targetTimeInMinutes = targetHour * 60 + targetMinute;
    let percentage = (currentTimeInMinutes / targetTimeInMinutes) * 100;
    percentage = Math.min(Math.max(percentage, 0), 100);
    percentageRef.value = parseInt(percentage.toFixed(1));
    if (parseInt(percentage.toFixed(1)) == 100) {
        MessagePlugin.info('💎航班准备完毕，请求处理💎')
        let countdown = 6; // 倒计时 6 秒
        const dia = DialogPlugin.confirm({
            header: '处理确认',
            body: `航班已就绪，是否确认处理该航班？ 倒计时：${countdown}秒`,
            confirmBtn: '确认处理',
            cancelBtn: '取消处理',
            onConfirm: () => {
                handleEfpsProcess(String(efps.value[0].id as number));
                dia.destroy();
            },
            onCancel: () => {
                MessagePlugin.info('取消处理');
                dia.destroy();
            },
        });

        const intervalId = setInterval(() => {
            countdown--;
            dia.update({
                body: `航班已就绪，是否确认处理该航班（呼号：${efps.value[0].a1}，目的地：${efps.value[0].h1}）？${countdown}秒`
            });

            if (countdown <= 0) {
                clearInterval(intervalId);
                dia.destroy();
                MessagePlugin.warning('未操作，进程单已自动加入处理队列');
                // 将该进程单加入处理队列
            }
        }, 1000);
    }
};
const handleTableVisibleChange = () => {
    tableVisible.value = !tableVisible.value
}

const handleAddVisibleChange = () => {
    addVisible.value = !addVisible.value
}
const togglePopconfirm = (id: string) => {
    visibleMap[id] = !visibleMap[id];
};
const handleEfpsProcessBtn = (id: string) => {
    handleEfpsProcess(id)
    visibleMap[id] = false;
}
const handleAddRunwayVisibleChange = () => {
    addRunwayVisible.value = !addRunwayVisible.value
}

const handleTransferedEfpsDataTableVisibleChange = () => {
    transferedEfpsDataTableVisible.value = !transferedEfpsDataTableVisible.value
}
const handleRunwayTableVisibleChange = () => {
    runwayTableVisible.value = !runwayTableVisible.value
}
const handleAddParkingVisibleChange = () => {
    addParkingVisible.value = !addParkingVisible.value
}
const handleParkingStandTableVisibleChange = () => {
    parkingStandTableVisible.value = !parkingStandTableVisible.value
}
const refreshDataBtn = () => {
    loadingVisible.value = true
    store.fetchAllData()
    setTimeout(() => {
        loadingVisible.value = false
    }, 500)
}
const refreshRunwayDataBtn = () => {
    loadingRunwayVisible.value = true
    runwayStore.fetchAllData()
    setTimeout(() => {
        loadingRunwayVisible.value = false
    }, 500)
}
const refreshParkingDataBtn = () => {
    loadingParkingVisible.value = true
    flightInfoStore.fetchAllData()
    parkingStandStore.fetchAllData()
    flightParkingStandStore.fetchAllData()
    setTimeout(() => {
        loadingParkingVisible.value = false
    }, 500)
}
const refreshTrendsBtn = () => {
    trendsLoadingVisible.value = true
    aircraftsTrendsStore.fetchAllData()
    useAirSpaceEventStore().getAirSpaceEventPage()
    setTimeout(() => {
        trendsLoadingVisible.value = false
    }, 800)
}
const refreshMsgsBtn = () => {
    msgsLoadingVisible.value = true
    alertMsgStore.fetchAllData()
    cooperaMsgStore.fetchAllData()
    useNoticesStore().fetchAllData()
    usesysMsgStore().fetchAllData()
    setTimeout(() => {
        msgsLoadingVisible.value = false
    }, 500)
}
onMounted(() => {
    loadingVisible.value = true
    store.fetchAllData().then(() => {
        calculatePercentage(filteredArrivalEfps, percentage1);
        calculatePercentage(filteredDepartureEfps, percentage2);
    })
    setTimeout(() => {
        loadingVisible.value = false
    }, 500)
    refreshRunwayDataBtn()
    refreshParkingDataBtn()
})
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.rround {
    background-color: rgba(240, 248, 255, 0.5);
    border: none;
    margin-right: 5px;
    transition-duration: 0.3s;
    backdrop-filter: blur(15px);

}

.rround:hover {
    transition-duration: 0.3s;
    transform: rotate(180deg);
}

.process {
    margin-left: 10px;
    width: 170px;
    background-color: rgba(240, 248, 255, 0.5);
    border-radius: 25px;
    padding: 15px;
    height: 35px;
    backdrop-filter: blur(15px);
}

.arrival-prepare-container {
    height: 250px;
    width: 480px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
    backdrop-filter: blur(15px);
}

.arrival-prepare-container:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    transition-duration: 0.5s;
}

.arrival-handled-container {
    height: 225px;
    width: 480px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    padding: 8px;
    margin-left: 4px;
    transition-duration: 0.5s;
    backdrop-filter: blur(15px);
}

.arrival-handled-container:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    transition-duration: 0.5s;
}



.departure-prepare-container {
    height: 250px;
    width: 480px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    padding: 8px;
    margin-left: 10px;
    transition-duration: 0.5s;
    backdrop-filter: blur(15px);
}

.departure-prepare-container:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    transition-duration: 0.5s;
}

.departure-handled-container {
    height: 225px;
    width: 480px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    padding: 8px;
    margin-left: 4px;
    transition-duration: 0.5s;
    backdrop-filter: blur(15px);
}

.departure-handled-container:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    transition-duration: 0.5s;
}

.transp {
    margin: 3px;
    margin-top: 0;
    font-size: xx-small;
    color: rgb(116, 116, 116);
    background-color: rgba(255, 255, 255, 0.502);
    border-radius: 5px;
    width: 95%;
    margin-left: 16px;
}

.prep {
    margin-top: 10px;
    font-size: xx-small;
    color: rgb(116, 116, 116);
    background-color: rgba(255, 255, 255, 0.502);
    border-radius: 5px;
    width: 95%;
    margin-left: 16px;
}

.rc-trans-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.rc-trans-enter-to {
    opacity: 1;
    transform: translateY(0);
    transition-duration: 0.8s;
}

.ar-trans-enter-from {
    opacity: 0;
    transform: translateX(-30px) scale(1.5);
    transition-duration: 0.8s;
    transition-delay: 0.2s;
    transition-timing-function: ease-in-out;
}

.ar-trans-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.bt-trans-enter-from {
    opacity: 0;
    transform: scale(0.1) rotateZ(180deg);

}

.bt-trans-enter-to {
    opacity: 1;
    transition-duration: 1s;
}

.ba-trans-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.ba-trans-enter-to {
    opacity: 1;
    transition-duration: 0.8s;
}

.rwg {
    background-color: #ffffff00;
    margin: 0;
    padding: 0;
}</style>