import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';


// 定义空域动态数据类型
export interface AirspaceInfoData {
    flow: string,
    quantity: number,
    alertMess: number,
    windSpeed: number,
    windDirection: number,
    visibility: number,
    ceiling: number
}
export const useAirspaceInfoStore = defineStore('airspaceInfo', () => {

    /*
    * 状态
    */
    // 东高空空域数据
    const EHairspaceInfo = ref<AirspaceInfoData>()
    // 西高空空域数据
    const WHairspaceInfo = ref<AirspaceInfoData>()
    // 南高空域数据
    const SHairspaceInfo = ref<AirspaceInfoData>()
    // 北高空域数据
    const NHairspaceInfo = ref<AirspaceInfoData>()
    // 东低空域数据
    const ELairspaceInfo = ref<AirspaceInfoData>()
    // 西低空域数据
    const WLairspaceInfo = ref<AirspaceInfoData>()
    // 南低空域数据
    const SLairspaceInfo = ref<AirspaceInfoData>()
    // 北低空域数据
    const NLairspaceInfo = ref<AirspaceInfoData>()

    /*
    * 方法
    */
    // 高空
    // 获取东高空域数据
    const getEHairspaceInfo = async () => {
        await axios.get(`/api/airspaceInfo`).then(res => {
            EHairspaceInfo.value = res.data.data
        })
    }
    // 获取西高空域数据
    const getWHairspaceInfo = async () => {
        await axios.get(`/api/airspaceInfo`).then(res => {
            WHairspaceInfo.value = res.data.data
        })
    }
    // 获取南高空域数据
    const getSHairspaceInfo = async () => {
        await axios.get(`/api/airspaceInfo`).then(res => {
            SHairspaceInfo.value = res.data.data
        })
    }
    // 获取北高空域数据
    const getNHairspaceInfo = async () => {
        await axios.get(`/api/airspaceInfo`).then(res => {
            NHairspaceInfo.value = res.data.data
        })
    }
    // 低空
    // 获取东低空域数据
    const getELairspaceInfo = async () => {
        await axios.get(`/api/airspaceInfo`).then(res => {
            ELairspaceInfo.value = res.data.data
        })
    }
    // 获取西低空域数据
    const getWLairspaceInfo = async () => {
        await axios.get(`/api/airspaceInfo`).then(res => {
            WLairspaceInfo.value = res.data.data
        })
    }
    // 获取南低空域数据
    const getSLairspaceInfo = async () => {
        await axios.get(`/api/airspaceInfo`).then(res => {
            SLairspaceInfo.value = res.data.data
        })
    }
    // 获取北低空域数据
    const getNLairspaceInfo = async () => {
        await axios.get(`/api/airspaceInfo`).then(res => {
            NLairspaceInfo.value = res.data.data
        })
    }

    return {
        getSLairspaceInfo,
        getNLairspaceInfo,
        SLairspaceInfo,
        NLairspaceInfo,
        getEHairspaceInfo,
        getWHairspaceInfo,
        getSHairspaceInfo,
        getWLairspaceInfo,
        getNHairspaceInfo,
        getELairspaceInfo,
        EHairspaceInfo,
        WHairspaceInfo,
        SHairspaceInfo,
        WLairspaceInfo,
        NHairspaceInfo,
        ELairspaceInfo,


    }
})