import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';


// 定义空域天气数据类型
export interface AirspaceWeatherData {
    coordinates: string;            // 经纬度，格式为 "latitude, longitude"
    windLevel: number;              // 风力等级
    windDescription: string;        // 风向描述
    hourlyPrecipitation: number;    // 1小时累计降水量 (mm)
    relativeHumidity: number;       // 相对湿度 (%)
    cloudCoverage: number;          // 云量 (%)
    cloudHeight: number;            // 云层高度 (m)
    visibility: number;             // 能见度 (m)
    pm25: number;                   // PM2.5浓度 (μg/m³)
    temperature: number;            // 当前温度 (°C)
    maxTemperature: number;         // 最高温度 (°C)
    minTemperature: number;         // 最低温度 (°C)
}

export const useAirspaceWeatherStore = defineStore('airspaceWeather', () => {

    /*
    * 状态
    */
    // 东高空空域天气数据
    const EHairspaceWeather = ref<AirspaceWeatherData>()
    // 西高空空域天气数据
    const WHairspaceWeather = ref<AirspaceWeatherData>()
    // 南高空域天气数据
    const SHairspaceWeather = ref<AirspaceWeatherData>()
    // 北高空域天气数据
    const NHairspaceWeather = ref<AirspaceWeatherData>()
    // 东低空域天气数据
    const ELairspaceWeather = ref<AirspaceWeatherData>()
    // 西低空域天气数据
    const WLairspaceWeather = ref<AirspaceWeatherData>()
    // 南低空域天气数据
    const SLairspaceWeather = ref<AirspaceWeatherData>()
    // 北低空域天气数据
    const NLairspaceWeather = ref<AirspaceWeatherData>()

    /*
    * 方法
    */
    // 高空
    // 获取东高空域数据
    const getEHairspaceWeather = async () => {
        await axios.get(`/api/weatherData`).then(res => {
            EHairspaceWeather.value = res.data.data
        })
    }
    // 获取西高空域数据
    const getWHairspaceWeather = async () => {
        await axios.get(`/api/weatherData`).then(res => {
            WHairspaceWeather.value = res.data.data
        })
    }
    // 获取南高空域数据
    const getSHairspaceWeather = async () => {
        await axios.get(`/api/weatherData`).then(res => {
            SHairspaceWeather.value = res.data.data
        })
    }
    // 获取北高空域数据
    const getNHairspaceWeather = async () => {
        await axios.get(`/api/weatherData`).then(res => {
            NHairspaceWeather.value = res.data.data
        })
    }
    // 低空
    // 获取东低空域数据
    const getELairspaceWeather = async () => {
        await axios.get(`/api/weatherData`).then(res => {
            ELairspaceWeather.value = res.data.data
        })
    }
    // 获取西低空域数据
    const getWLairspaceWeather = async () => {
        await axios.get(`/api/weatherData`).then(res => {
            WLairspaceWeather.value = res.data.data
        })
    }
    // 获取南低空域数据
    const getSLairspaceWeather = async () => {
        await axios.get(`/api/weatherData`).then(res => {
            SLairspaceWeather.value = res.data.data
        })
    }
    // 获取北低空域数据
    const getNLairspaceWeather = async () => {
        await axios.get(`/api/weatherData`).then(res => {
            NLairspaceWeather.value = res.data.data
        })
    }

    return {
        EHairspaceWeather,
        SHairspaceWeather,
        WHairspaceWeather,
        NHairspaceWeather,
        ELairspaceWeather,
        SLairspaceWeather,
        WLairspaceWeather,
        NLairspaceWeather,

        getEHairspaceWeather,
        getWHairspaceWeather,
        getSHairspaceWeather,
        getNHairspaceWeather,
        getELairspaceWeather,
        getWLairspaceWeather,
        getSLairspaceWeather,
        getNLairspaceWeather,

    }
})