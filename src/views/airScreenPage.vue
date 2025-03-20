<template>
    <div class="wrap">
        <div class="top-card">
            <t-button @click="returnButton"
                style="background-color: rgba(240, 248, 255, 0.466);color: black;font-weight: bolder;">
                <template #icon><rollback-icon /></template>
                Back
            </t-button>
        </div>
        <transition name="t-trans" appear>
            <div class="airport">
                {{ AIRPORT_NAME }}航班信息大屏

            </div>
        </transition>
        <div class="content">
            <transition name="l-trans" appear>
                <t-list class="list">
                    <t-row style="font-weight: bolder;color:rgb(255, 241, 159);font-family: 宋体;margin-bottom: 20px;">
                        <t-col :span="1">航班号</t-col>
                        <t-col :span="2">计划起降时间</t-col>
                        <t-col :span="2">计划到达时间</t-col>
                        <t-col :span="2">实际起降时间</t-col>
                        <t-col :span="2">实际到达时间</t-col>
                        <t-col :span="1">状态</t-col>
                        <t-col :span="2">延误原因</t-col>
                    </t-row>
                    <div v-for="fl in flightInfoData">
                        <div class="fl-item">
                            <t-row style="font-weight: bolder;color:rgb(213, 251, 255);font-family: 宋体;">
                                <t-col :span="1">{{ fl.flightNumber }}</t-col>
                                <t-col :span="2">{{ fl.scheduledDepartureTime }}</t-col>
                                <t-col :span="2">{{ fl.scheduledArrivalTime }}</t-col>
                                <t-col :span="2">{{ fl.actualDepartureTime }}</t-col>
                                <t-col :span="2">{{ fl.actualArrivalTime }}</t-col>
                                <t-col :span="1" v-if="fl.flightStatus == 0"><el-tag type="info" effect="dark">候机</el-tag></t-col>
                                <t-col :span="1" v-if="fl.flightStatus == 1"><el-tag type="primary" effect="dark">起飞</el-tag></t-col>
                                <t-col :span="1" v-if="fl.flightStatus == 2"><el-tag type="primary" effect="dark">降落</el-tag></t-col>  
                                <t-col :span="1" v-if="fl.flightStatus == 3"><el-tag type="warning" effect="dark">延误</el-tag></t-col>
                                <t-col :span="1" v-if="fl.flightStatus == 4"><el-tag type="danger" effect="dark">取消</el-tag></t-col>
                                <t-col :span="1" v-if="fl.flightStatus == 5"><el-tag type="success" effect="dark">检入</el-tag></t-col>

                                <t-col :span="2">{{ fl.delayReason }}</t-col>
                            </t-row>
                        </div>
                        
                    </div>
                </t-list>
            </transition>
        </div>
        <t-row>
            <t-col :span="5"></t-col>
            <t-col>EFPS-SYSTEM</t-col>
            <t-col>&ensp;powered by JDZU 2025</t-col>
        </t-row>
    </div>
</template>
  
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { AIRPORT_CODE, AIRPORT_NAME } from '@/config/config'
import { flightInfoData } from '@/stores/flightInfo-store';

const router = useRouter();
const returnButton = () => {
    router.push('/home/aircrafts-info')
}
</script>
  
<style scoped>
.wrap {
    height: 100vh;
    background: linear-gradient(45deg, #b6d4ff, #5fd4ff, #957bfe);
    background-size: 400% 400%;
    animation: gradientBG 5s ease infinite;
}

@keyframes gradientBG {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
}

.list {
    display: flex;
    justify-content: center;
    max-height: 500px;
    width: 1200px;
    height: 500px;
    background-color: #0000005a;
    backdrop-filter: blur(30px);
    border-radius: 25px;
    padding: 35px;
}

.l-trans-enter-from {
    opacity: 0;
    transform: scale(0.1) translateY(100px);
}

.l-trans-enter-active {
    transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 1s ease;
}

.l-trans-enter-to {
    opacity: 1;
    transform: scale(1);
}

.l-trans-leave-active {
    transition: transform 1s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 1s ease;
}

.l-trans-leave-to {
    opacity: 0;
    transform: scale(0.1);
}

.airport {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: xx-large;
    font-weight: bolder;
    background: linear-gradient(45deg, #3d8eff, #1c5b55);
    -webkit-background-clip: text;
    color: transparent;
}

.t-trans-enter-from {
    opacity: 0;
    transform: scale(0.1) translateY(100px);

}

.t-trans-enter-to {
    opacity: 1;
    transition-duration: 1s;
}

.fl-item {
    height: 40px;
    width: 1100px;
    border-radius: 15px;
}
</style>
  