<template>
    <el-row class="content">
        <el-col :span="16">
            <div style="position: relative; height: 620px">
                <t-list class="rwg" style="position: relative; height: 100%; overflow-y: scroll">
                    <el-row style="margin-top: 10px;">
                        <el-col :span="3.5">
                            <p
                                style="margin-top: 0;text-decoration: underline rgba(0, 0, 255, 0.5) 10px;font-weight: bold;margin-left: 10px;">
                                <t-icon name="flight-landing"></t-icon>进港
                                <transition name="bt-trans" appear>
                                    <t-button class="rround" theme="default" shape="circle"
                                        @click="store.fetchAllAreaEfpsData" style="margin-left: 10px;"><t-icon
                                            name='refresh'></t-icon></t-button>
                                </transition>
                                <transition name="bt-trans" appear>
                                    <t-button class="rround" theme="default" shape="circle"
                                        @click="handleAddVisibleChange"><t-icon name='add'></t-icon></t-button>
                                </transition>
                            </p>
                        </el-col>
                        <transition name="ba-trans" appear>
                            <el-col :span="3.5" class="process">
                                <p style="font-size: xx-small;margin: -11px;"><t-icon name="next"></t-icon>下一个进程单准备</p>
                                <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60"
                                    :status="'active'" style="font-size: xx-small;" />
                            </el-col>
                        </transition>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <transition name="ar-trans" appear>
                                <div class="arrival-prepare-container">
                                    <el-scrollbar height="250px" style="border-radius: 10px;">
                                        <div v-for="item in store.filteredArrivalEfps" :key="item.id"
                                            style="display: flex; align-items: center; flex-direction: column;margin-bottom: 10px;">
                                            <t-popconfirm theme="default" content="您想要处理该进程单吗"
                                                :visible="visibleMap[item.id as number]"
                                                :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[item.id as number] = false } }"
                                                :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleArrivalEfpsProcess(String(item.id as number)) }">
                                                <areaEfps :BackgroundColor="prepareBackgroundColor" :efpsData="item || {}"
                                                    @click="togglePopconfirm(String(item.id as number))" />
                                            </t-popconfirm>
                                        </div>
                                    </el-scrollbar>
                                </div>
                            </transition>

                        </el-col>
                        <el-col :span="12">
                            <p class="transp">&ensp;Transferred</p>
                            <transition name="ar-trans" appear>
                                <div class="arrival-handled-container">
                                    <el-scrollbar height="230px" style="border-radius: 10px;">
                                        <div v-for="item in store.filteredTransferredArrivalEfps"
                                            style="width: 100%;margin-bottom: 10px;" max-height="230">
                                            <areaEfps :BackgroundColor="handledBackgroundColor" :efpsData="item || {}" />
                                        </div>
                                    </el-scrollbar>
                                </div>
                            </transition>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px;">
                        <el-col :span="3.5">
                            <p
                                style="margin-top: 0;text-decoration: underline blue 10px;font-weight: bold;margin-left: 10px;">
                                <t-icon name="flight-takeoff"></t-icon>出港
                                <transition name="bt-trans" appear>



                                    <t-button class="rround" theme="default" shape="circle"
                                        @click="store.fetchAllAreaEfpsData" style="margin-left: 10px;"><t-icon
                                            name='refresh'></t-icon></t-button>
                                </transition>
                                <transition name="bt-trans" appear>

                                    <t-button class="rround" theme="default" shape="circle"
                                        @click="handleAddVisibleChange"><t-icon name='add'></t-icon></t-button>
                                </transition>

                            </p>
                        </el-col>
                        <transition name="ba-trans" appear>


                            <el-col :span="3.5" class="process">
                                <p style="font-size: xx-small;margin: -11px;"><t-icon name="next"></t-icon>下一个进程单准备</p>
                                <t-progress theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="60"
                                    :status="'active'" style="font-size: xx-small;" />
                            </el-col>
                        </transition>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <transition name="ar-trans" appear>
                                <div class="departure-prepare-container">
                                    <el-scrollbar height="250px" style="border-radius: 10px;">
                                        <div v-for="item in store.filteredDepartureEfps" :key="item.id"
                                            style="display: flex; align-items: center; flex-direction: column;margin-bottom: 10px;">
                                            <t-popconfirm theme="default" content="您想要处理该进程单吗"
                                                :visible="visibleMap[item.id as number]"
                                                :cancelBtn="{ content: '取消', size: 'small', theme: 'default', onClick: () => { visibleMap[item.id as number] = false } }"
                                                :confirmBtn="{ content: '确定', size: 'small', theme: 'primary', onClick: () => handleDepartureEfpsProcess(String(item.id as number)) }">
                                                <areaEfps :BackgroundColor="prepareBackgroundColor" :efpsData="item || {}"
                                                    @click="togglePopconfirm(String(item.id as number))" />
                                            </t-popconfirm>
                                        </div>
                                    </el-scrollbar>
                                </div>
                            </transition>
                        </el-col>
                        <el-col :span="12">
                            <p class="transp">&ensp;Transferred</p>
                            <transition name="ar-trans" appear>
                                <div class="departure-handled-container">
                                    <el-scrollbar height="230px" style="border-radius: 10px;">
                                        <div v-for="item in store.filteredTransferredDepartureEfps"
                                            style="width: 100%;margin-bottom: 10px;" max-height="230">
                                            <areaEfps :BackgroundColor="handledBackgroundColor" :efps-data="item || {}" />
                                        </div>
                                    </el-scrollbar>
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
                    <el-row style="justify-content: center;color: #ffffff;font-weight: bolder;">Powered By JDZU
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
    <areaEfpsDataAdd :visible="addVisible" @update:visible="handleAddVisibleChange" />
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import areaEfps from '@/components/areaControlPage/areaEfps.vue'
import rightControlCenter from '@/components/areaControlPage/rightControlCenter.vue'
import msgTool from '@/components/areaControlPage/msgTool.vue'
import trendsTool from '@/components/areaControlPage/trendsTool.vue'
import areaEfpsDataAdd from '../areaEfpsDataAdd.vue'
import { useareaEfpsStore } from '@/stores/areaEfps-store'

const visibleMap = reactive<{ [key: string]: boolean }>({});
const store = useareaEfpsStore()
const addVisible = ref(false)
const prepareBackgroundColor = ref('antiquewhite')
const handledBackgroundColor = ref('lightgreen')

const handleAddVisibleChange = () => {
    addVisible.value = !addVisible.value
}
const togglePopconfirm = (id: string) => {
    visibleMap[id] = !visibleMap[id];
};
const handleArrivalEfpsProcess = (id: string) => {
    const areaEfps = {
        id: id,
        status: 2,
    };
    console.log(id)
    store.updateAreaEfpsData(areaEfps);
    visibleMap[id] = false;
}
const handleDepartureEfpsProcess = (id: string) => {
    const areaEfps = {
        id: id,
        status: 2,
    };
    console.log(id)
    store.updateAreaEfpsData(areaEfps);
    visibleMap[id] = false;
}


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
    width: 15%;
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