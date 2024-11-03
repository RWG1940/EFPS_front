<template>
    <div class="asw">
        <t-row :gutter="25" style="margin-bottom: 20px;">
            <t-col>
                <weatherItem :data="store.EHairspaceWeather" header='EH' />
            </t-col>
            <t-col>
                <weatherItem :data="store.WHairspaceWeather" header='WH' />
            </t-col>
        </t-row>
        <t-row :gutter="25" style="margin-bottom: 20px;" >
            <t-col>
                <weatherItem :data="store.SHairspaceWeather" header='SH' />
            </t-col>
            <t-col>
                <weatherItem :data="store.NHairspaceWeather" header='NH' />
            </t-col>
        </t-row>
        <t-row :gutter="25" style="margin-bottom: 20px;">
            <t-col>
                <weatherItem :data="store.ELairspaceWeather" header='EL' />
            </t-col>
            <t-col>
                <weatherItem :data="store.WHairspaceWeather" header='WL' />
            </t-col>
        </t-row>
        <t-row :gutter="25" style="margin-bottom: 20px;">
            <t-col>
                <weatherItem :data="store.SLairspaceWeather" header='SL' />
            </t-col>
            <t-col>
                <weatherItem :data="store.NLairspaceWeather" header='NL' />
            </t-col>
        </t-row>
        
  

    </div>
</template>
    
<script setup lang='ts'>
import weatherItem from './weatherItem.vue';
import { onMounted } from 'vue';
import { useAirspaceWeatherStore } from '@/stores/airSpaceWeather-store';
const store = useAirspaceWeatherStore();

onMounted(() => {
    store.getEHairspaceWeather()
    store.getSHairspaceWeather()
    store.getNHairspaceWeather()
    store.getELairspaceWeather()
    store.getWLairspaceWeather()
    store.getWHairspaceWeather()
    store.getSLairspaceWeather()
    store.getNLairspaceWeather()
    
})

</script>
    
<style scoped>
.asw {
    padding: 10px; 
}
</style>