<template>
    <div class="airspace">
        <el-row :gutter="5">
            <el-col :span="12">
                <el-row>
                    <transition name="e-trans" appear>
                        <el-col class="ec1">
                            <p class="p-title">东高空</p>
                            <airspaceInfo :data="store.EHairspaceInfo" :status="airSpaceEventStore.eastAirSpaceStatus" />
                        </el-col>
                    </transition>
                    <transition name="e-trans" appear>
                    <el-col class="ec11">
                        <p class="p-title">西高空</p>
                        <airspaceInfo :data="store.WHairspaceInfo" :status="airSpaceEventStore.westAirSpaceStatus" />
                    </el-col>
                </transition>
                </el-row>
                <el-row>
                    <transition name="e-trans" appear>
                    <el-col class="ec21">
                        <p class="p-title">南高空</p>
                        <airspaceInfo :data="store.NHairspaceInfo" :status="airSpaceEventStore.southAirSpaceStatus" />
                    </el-col>
                </transition>
                <transition name="e-trans" appear>
                    <el-col class="ec2">
                        <p class="p-title">北高空</p>
                        <airspaceInfo :data="store.NHairspaceInfo"  :status="airSpaceEventStore.northAirSpaceStatus" />
                    </el-col>
                </transition>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <transition name="e1-trans" appear>
                    <el-col class="ec1">
                        <p class="p-title">东低空</p>
                        <airspaceInfo :data="store.ELairspaceInfo" :status="airSpaceEventStore.eastLowAirSpaceStatus" />
                    </el-col>
                </transition>
                <transition name="e1-trans" appear>
                    <el-col class="ec11">
                        <p class="p-title">西低空</p>
                        <airspaceInfo :data="store.WLairspaceInfo" :status="airSpaceEventStore.westLowAirSpaceStatus" />
                    </el-col>
                </transition>
                </el-row>
                <el-row>
                    <transition name="e1-trans" appear>
                    <el-col class="ec21">
                        <p class="p-title">南低空</p>
                        <airspaceInfo :data="store.SLairspaceInfo" :status="airSpaceEventStore.southLowAirSpaceStatus" />
                    </el-col>
                </transition>
                <transition name="e1-trans" appear>
                    <el-col class="ec2">
                        <p class="p-title">北低空</p>
                        <airspaceInfo :data="store.NLairspaceInfo" :status="airSpaceEventStore.northLowAirSpaceStatus" />
                    </el-col>
                </transition>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
import airspaceInfo from './airspaceInfo.vue'
import { onMounted,computed } from 'vue'
import { useAirspaceInfoStore } from '@/stores/airspaceInfo-store'
import { useAirSpaceEventStore } from '@/stores/airSpaceEvent-store';

const store = useAirspaceInfoStore()
const airSpaceEventStore = useAirSpaceEventStore()

</script>
<style lang="scss" scoped>


.p-title {
    margin: 0;
    font-size: small;
    font-weight: bold;
}



.ec1 {
    background-color: rgba(135, 206, 250, 0.5);
    height: 110px;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 5px;
    transition-duration: 0.3s;
}
.ec1:hover {
    background-color: rgba(135, 206, 250, 1);
    color: white;
    text-shadow: 2px 2px 1px rgb(184, 177, 255);
}

.ec11 {
    background-color: rgba(255, 160, 122, 0.5);
    height: 110px;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 5px;
    transition-duration: 0.3s;
}
.ec11:hover {
    background-color: rgba(255, 160, 122, 1);
    color: white;
    text-shadow: 2px 2px 1px rgb(255, 160, 122);
}

.ec2 {
    background-color: rgba(176, 196, 222, 0.5);
    height: 110px;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 5px;
    transition-duration: 0.3s;
}
.ec2:hover {
    background-color: rgba(176, 196, 222, 1);
    color: white;
    text-shadow: 2px 2px 1px rgb(176, 196, 222);
}

.ec21 {
    background-color: rgba(127, 255, 212, 0.5);
    height: 110px;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 5px;
    transition-duration: 0.3s;
}
.ec21:hover {
    background-color: rgb(94, 187, 156);
    color: white;
    text-shadow: 2px 2px 1px rgb(100, 201, 167);
}

.e-trans-enter-from,
.e-trans-leave-to {
    transform: translateX(-100px) scale(0.2) rotateY(-60deg) rotateX(60deg);
    opacity: 0;
}
.e-trans-enter-active,
.e-trans-leave-active {
    transition: all 0.5s ease;
} 

.e1-trans-enter-from,
.e1-trans-leave-to {
    transform: translateX(100px) scale(0.2) rotateY(60deg) rotateX(-60deg);
    opacity: 0;
}
.e1-trans-enter-active,
.e1-trans-leave-active {
    transition: all 0.5s ease;
} 


</style>