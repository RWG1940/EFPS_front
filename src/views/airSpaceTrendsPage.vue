<template>
    <div class="wrap">
        <el-affix :offset="120">
            <t-button style="margin-left: 1000px;" theme="default" @click="operateBtn">
                <t-icon :name="iconName" class="icon"></t-icon>空域操作
            </t-button>
        </el-affix>
        <t-row>
            <p class="hp">空域动态概览</p>
        </t-row>
        <t-row style="margin: 10px;">
            <t-col :span="6">
                <airspace />
            </t-col>
            <t-col :span="6"></t-col>
        </t-row>
        <t-row>
            <p class="hp">各空域流量明细</p>
        </t-row>
        <t-row>
            <airSpaceFlowView />
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
        <t-drawer v-model:visible="visible" header="空域操作"
            :on-overlay-click="() => { visible = false, iconName = 'setting-1' }" :show-overlay="false" placement="bottom"
            @cancel="() => { visible = false, iconName = 'setting-1' }"
            @confirm="() => { visible = false, iconName = 'setting-1' }">
            <t-row :gutter="16">
                <t-col :span="2">
                    空域：
                    <t-select placeholder="请选择空域" clearable></t-select>
                </t-col>
                <t-col :span="2">
                    操作：
                    <t-select placeholder="请选择操作" clearable></t-select>
                </t-col>
                <t-col :span="2">
                    起止日期：
                    <t-date-range-picker enable-time-picker allow-input clearable @pick="" @change="" />
                </t-col>
            </t-row>
            <t-row :gutter="16">
                <t-col :span="2">
                    <t-card style="margin-top: 16px;">该空域目前状态：</t-card>
                </t-col>
            </t-row>
        </t-drawer>
    </div>
</template>
<script setup lang="ts">
import { formatDate } from '@/utils/moment'
import { ref } from 'vue';
import airspace from '@/components/areaControlPage/trendsTool/airspace.vue';
import airSpaceFlowView from '@/components/airSpaceTrendsPage/airSpaceFlowView.vue';
import airSpaceWeather from '@/components/airSpaceTrendsPage/airSpaceWeather.vue';
import airSpaceEventTable from '@/components/airSpaceTrendsPage/airSpaceEventTable.vue';

const visible = ref(false);
const iconName = ref('setting-1')
const operateBtn = () => {
    visible.value = !visible.value;
    if (visible.value) {
        iconName.value = 'close'
    } else {
        iconName.value = 'setting-1'
    }
}

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
}
</style>
  