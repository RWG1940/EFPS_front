<template>
    <el-row class="row">
        <div class="aswi">
            <el-scrollbar>
                <t-row>空域：{{ header }}</t-row>
                <t-row>经纬度：{{ data.coordinates }}</t-row>
                <hr>
                <t-row>风力等级：{{ data.windLevel }}</t-row>
                <t-row>风向描述：{{ data.windDescription }}</t-row>
                <hr>
                <t-row>1小时累计降水量(mm)：{{ data.hourlyPrecipitation }}</t-row>
                <t-row>相对湿度：{{ data.relativeHumidity }}</t-row>
                <hr>
                <t-row>云量(%)：{{ data.cloudCoverage }}</t-row>
                <t-row>云层高度：{{ data.cloudHeight }}</t-row>
                <t-row>能见度(m)：{{ data.visibility }}</t-row>
                <t-row>pm2.5浓度(μg/m3)：{{ data.pm25 }}</t-row>
                <hr>
                <t-row>温度：{{ data.temperature }}</t-row>
                <t-row>最高温度：{{ data.maxTemperature }}</t-row>
                <t-row>最低温度：{{ data.minTemperature }}</t-row>
                <hr>
            </el-scrollbar>
        </div>
        <div class="aswii">
            <t-row>气象预警数据</t-row>

        </div>
    </el-row>
</template>
<script lang="ts" setup>
import { useAirspaceWeatherStore } from '@/stores/airSpaceWeather-store';
import type { AirspaceWeatherData } from '@/stores/airSpaceWeather-store';

const store = useAirspaceWeatherStore()
const props = defineProps({
    data: {
        type: Object as () => AirspaceWeatherData,
        default: () => ({})
    },
    header: {
        type: String,
        default: ''
    }
})

</script>
<style scoped>
.aswi {
    padding: 10px;
    width: 240px;
    height: 200px;
    background-color: aliceblue;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.aswii {
    padding: 10px;
    width: 310px;
    height: 200px;
    background-color: rgb(248, 246, 231);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.row {
    transition-duration: 0.5s;
    border-radius: 10px;
}

.row:hover {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    transition-duration: 0.5s;
    transform: scale(1.02);
}
</style>