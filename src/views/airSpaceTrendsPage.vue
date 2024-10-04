<template>
    <div class="wrap">
        <el-affix :offset="120">
            <t-button style="margin-left: 1000px;" theme="default" @click="visible = true">
                <t-icon name="setting-1"></t-icon>空域操作
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
        <t-drawer v-model:visible="visible" header="空域操作" :on-overlay-click="() => (visible = false)" :show-overlay="false"
            placement="bottom" @cancel="visible = false">
            <p>d</p>
        </t-drawer>
    </div>
</template>
<script setup lang="ts">
import { formatDate } from '@/utils/moment'
import { ref } from 'vue';
import airspace from '@/components/areaControlPage/trendsTool/airspace.vue';
import airSpaceFlowView from '@/components/airSpaceTrendsPage/airSpaceFlowView.vue';
import airSpaceWeather from '@/components/airSpaceTrendsPage/airSpaceWeather.vue';

const visible = ref(false);


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
</style>
  