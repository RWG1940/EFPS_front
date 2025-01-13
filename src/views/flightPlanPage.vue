<template>
    <div class="wrap">
        <t-row>
            <t-col style="font-weight: bold;border-bottom: 5px solid blue;">飞行计划表
            </t-col>
        </t-row>
        <t-row style="margin-top: 15px;margin-bottom: 15px;" :gutter="10">
            <t-col :span="1">
                <t-input placeholder="航班号"></t-input>
            </t-col>
            <t-col :span="1">
                <t-input placeholder="机型"></t-input>
            </t-col>
            <t-col :span="1">
                <t-input placeholder="起降机场"></t-input>
            </t-col>
            <t-col :span="1">
                <t-input placeholder="目的机场"></t-input>
            </t-col>
         
                <t-button @click="" style="margin-left: 5px;">
                    <template #icon><search-icon /></template>
                    搜索
                </t-button>
       
          
                <t-button theme="primary" variant="outline" @click="" style="margin-left: 10px;">
                    <template #icon><refresh-icon /></template>
                    重置
                </t-button>
          
         
                <t-button theme="warning" :variant="flightPlanStore.selectedIds.length > 0 ? 'base':'outline'"  @click="" style="margin-left: 10px;">
                    <template #icon><send-icon /></template>
                    一键转单
                    <div v-if="flightPlanStore.selectedIds.length > 0">（已选中{{ flightPlanStore.selectedIds.length }}条）</div> 
                </t-button>
       
          
                <t-button theme="primary" variant="outline"  @click="" style="margin-left: 10px;">
                    <template #icon><add-icon /></template>
                    手动添加
                </t-button>
       
       
                <t-button theme="primary" variant="outline"  @click="" style="margin-left: 10px;">
                    <template #icon><internet-icon /></template>
                    拉单
                </t-button>

                <t-button theme="danger" :variant="flightPlanStore.selectedIds.length > 0 ? 'base':'outline'"  @click="" style="margin-left: 10px;">
                    <template #icon><delete-1-icon /></template>
                    删除
                    <div v-if="flightPlanStore.selectedIds.length > 0">（已选中{{ flightPlanStore.selectedIds.length }}条）</div> 
                </t-button>
     
        </t-row>
        <flightPlanDataTable />


    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import flightPlanDataTable from "@/components/flightPlanPage/flightPlanDataTable.vue"
import { flightPlanStore } from '@/stores/flightPlan-store';




</script>
<style scoped>
.wrap {
    background-color: white;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 98%;
}
</style>