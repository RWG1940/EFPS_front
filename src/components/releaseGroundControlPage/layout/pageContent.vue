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
                                <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60"
                                    :status="'active'" style="font-size: xx-small;" />
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
                                <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60"
                                    :status="'active'" style="font-size: xx-small;" />
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
                            <t-button class="rround" theme="default" shape="circle" @click="handleTransferedEfpsDataTableVisibleChange"><t-icon
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
                                                    :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleArrivalEfpsProcessBtn(String(item.id as number)) }">
                                                    <releaseGroundEfps :BackgroundColor="prepareBackgroundColor"
                                                        :efpsData="item || {}"
                                                        @click="togglePopconfirm(String(item.id as number))" />
                                                </t-popconfirm>
                                            </div>
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
                                                    :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleDepartureEfpsProcessBtn(String(item.id as number)) }">
                                                    <releaseGroundEfps :BackgroundColor="prepareBackgroundColor"
                                                        :efpsData="item || {}"
                                                        @click="togglePopconfirm(String(item.id as number))" />
                                                </t-popconfirm>
                                            </div>
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
                                    @click=""><t-icon name='add'></t-icon></t-button>
                            </transition>
                            <transition name="bt-trans" appear>
                                <t-button class="rround" theme="default" shape="circle"
                                    @click=""><t-icon name='fullscreen-2'></t-icon></t-button>
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
                        <t-button class="rround" theme="default" shape="circle"><t-icon name='refresh'></t-icon></t-button>
                    </p>
                    <el-row>
                        <trendsTool />
                    </el-row>
                    <p style="margin-top: 10px;text-decoration: underline blue 10px;font-weight: bold;margin-left: 10px;">
                        <t-icon name="info-circle"></t-icon>信息
                        <t-button class="rround" theme="default" shape="circle"><t-icon name='refresh'></t-icon></t-button>
                    </p>
                    <el-row>
                        <msgTool />
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
    <transferedEfpsDataTable :visible="transferedEfpsDataTableVisible" @update:visible="handleTransferedEfpsDataTableVisibleChange" />
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import releaseGroundEfps from '@/components/releaseGroundControlPage/releaseGroundEfps.vue'
import rightControlCenter from '@/components/releaseGroundControlPage/rightControlCenter.vue'
import msgTool from '@/components/releaseGroundControlPage/msgTool.vue'
import trendsTool from '@/components/releaseGroundControlPage/trendsTool.vue'
import releaseGroundEfpsDataAdd from '../releaseGroundEfpsDataAdd.vue'
import { useReleaseGroundEfpsStore, filteredArrivalEfps, filteredDepartureEfps, filteredTransferredArrivalEfps, filteredTransferredDepartureEfps, handleArrivalEfpsProcess, handleDepartureEfpsProcess } from '@/stores/releaseGroundEfps-store'
import releaseGroundEfpsDataTable from '../releaseGroundEfpsDataTable.vue'
import runway from '@/components/releaseGroundControlPage/trendsTool/runway.vue'
import parkingplace from '@/components/releaseGroundControlPage/trendsTool/parkingplace.vue'
import { runwayStore } from '@/stores/runway-store'
import runwayDataAdd from '../runwayDataAdd.vue'
import runwayDataTable from '../runwayDataTable.vue'
import { parkingStandStore } from '@/stores/parkingStand-store';
import { flightInfoStore } from '@/stores/flightInfo-store';
import { flightParkingStandStore } from '@/stores/flightParkingStand-store';
import transferedEfpsDataTable from '../transferedEfpsDataTable.vue';

const visibleMap = reactive<{ [key: string]: boolean }>({});
const store = useReleaseGroundEfpsStore()
const addVisible = ref(false)
const prepareBackgroundColor = ref('antiquewhite')
const loadingVisible = ref(false)
const loadingRunwayVisible = ref(false)
const loadingParkingVisible = ref(false)
const tableVisible = ref(false)
const addRunwayVisible = ref(false)
const runwayTableVisible = ref(false)
const transferedEfpsDataTableVisible = ref(false)
const handleTableVisibleChange = () => {
    tableVisible.value = !tableVisible.value
}

const handleAddVisibleChange = () => {
    addVisible.value = !addVisible.value
}
const togglePopconfirm = (id: string) => {
    visibleMap[id] = !visibleMap[id];
};
const handleArrivalEfpsProcessBtn = (id: string) => {
    handleArrivalEfpsProcess(id)
    visibleMap[id] = false;
}
const handleDepartureEfpsProcessBtn = (id: string) => {
    handleDepartureEfpsProcess(id)
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
onMounted(() => {
    refreshDataBtn()
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
}
</style>