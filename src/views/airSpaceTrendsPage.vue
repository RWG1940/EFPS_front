<template>
    <div class="wrap">
        <el-affix :offset="120">
            <t-button style="position: absolute;margin-left: 1000px;background-color: rgba(141, 141, 141, 0.397);"
                theme="default" @click="operateBtn">
                <t-icon :name="iconName" class="icon"></t-icon>空域操作
            </t-button>
        </el-affix>

        <t-row :gutter="35">
            <t-col :span="6">
                <t-row>
                    <p class="hp">空域动态概览</p>
                </t-row>
                <t-row style="margin: 10px;">
                    <airspace />
                </t-row>
            </t-col>
            <t-col :span="6">
                <t-row>
                    <p class="hp">各空域流量明细</p>
                </t-row>
                <t-row>
                    <airSpaceFlowView />
                </t-row>
            </t-col>
        </t-row>

        <t-row>
            <p class="hp">各空域天气明细</p>
        </t-row>
        <t-row>
            <airSpaceWeather />
        </t-row>
        <t-row>
            <p class="hp">各空域状态以及事件明细</p>
        </t-row>
        <t-row style="justify-content: center;align-items: center;padding: 10px;margin: 10px;border-radius: 10px;">
            <airSpaceEventTable />
        </t-row>
        <t-drawer v-model:visible="store.operationPanelVisible" header="空域操作"
            :on-overlay-click="() => { store.operationPanelVisible = false }" placement="bottom"
            @cancel="() => { store.operationPanelVisible = false; }" @confirm="operateConfirm">
            <t-row :gutter="16">
                <t-col :span="2">
                    空域：
                    <t-select v-model="store.operateAirSpace.name" placeholder="请选择空域" :options="store.airSpaceNameOptions"
                        clearable></t-select>
                </t-col>
                <t-col :span="2">
                    操作：
                    <t-select v-model="store.operateAirSpace.title" placeholder="请选择操作" :options="store.operationOptions"
                        clearable></t-select>
                </t-col>
                <t-col :span="1">
                    数值：
                    <t-input v-model="store.operateAirSpaceNum" placeholder="请输入数值" clearable></t-input>
                </t-col>
                <t-col :span="2">
                    起止日期：
                    <t-input-adornment prepend="开始时间">
                        <t-date-picker v-model="store.operateAirSpace.starttime" enable-time-picker allow-input
                            clearable />
                    </t-input-adornment>
                    <t-input-adornment prepend="结束时间">
                        <t-date-picker v-model="store.operateAirSpace.endtime" enable-time-picker allow-input
                            clearable />
                    </t-input-adornment>
                </t-col>
            </t-row>
            <t-row :gutter="16">
                <t-col :span="6">
                    <t-card style="margin-top: 16px;">该空域目前状态：
                        <t-tag size="large" style="margin: 5px;" v-for="(item, index) in airSpace" :key="index"
                            effect="dark">状态：{{ item.title }},持续期间：{{ item.starttime }}到{{ item.endtime }}
                            <el-button @click="store.endAirSpaceEvent(item)" type="danger"
                                size="small">结束该状态</el-button></t-tag>
                    </t-card>
                </t-col>
            </t-row>
        </t-drawer>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import airspace from '@/components/areaControlPage/trendsTool/airspace.vue';
import airSpaceFlowView from '@/components/airSpaceTrendsPage/airSpaceFlowView.vue';
import airSpaceWeather from '@/components/airSpaceTrendsPage/airSpaceWeather.vue';
import airSpaceEventTable from '@/components/airSpaceTrendsPage/airSpaceEventTable.vue';
import { useAirSpaceEventStore } from '@/stores/airSpaceEvent-store';
import type { DateRangePickerProps } from 'tdesign-vue-next';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import type { AirSpaceEventData } from '@/stores/airSpaceEvent-store';


const store = useAirSpaceEventStore();
const onPick: DateRangePickerProps['onPick'] = (value: any, context) => {
    store.operateAirSpace.startTime = value[0]
    store.operateAirSpace.endTime = value[1]
}
const onChange: DateRangePickerProps['onChange'] = (value: any, context) => {
    store.operateAirSpace.startTime = value[0]
    store.operateAirSpace.endTime = value[1]
};
const iconName = computed(() => {
    return store.operationPanelVisible ? 'close' : 'setting-1';
});
const operateBtn = () => {
    store.operationPanelVisible = !store.operationPanelVisible;
    store.getAllAirSpaceEventList()
}

const operateConfirm = () => {
    const c = DialogPlugin({
        theme: 'warning',
        header: '警告',
        body: '你确定发布该空域的管制指令?',
        confirmBtn: '确认',
        cancelBtn: '取消',
        onConfirm: () => {
            store.addAirSpaceEventOperate(store.operateAirSpace);
            store.operationPanelVisible = false;
            c.destroy();
        },
        onClose: () => {
            c.destroy();
        },
    });
}

const airSpace = computed(() => {
    return store.airSpaceEventList.filter((item: any) => item.name === store.operateAirSpace.name && item.status === '进行中' && item.type === 1);
});
onMounted(() => {
    store.getAllAirSpaceEventList()
})
</script>
<style lang="scss" scoped>
.wrap {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 98%;
}

.hp {
    font-weight: bolder;
    margin: 0;
    border-bottom: 5px solid blue;
}

.icon {
    margin-top: 2px;
}</style>
  