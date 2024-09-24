<template>
  <div class="wrap">
    <t-row>
      <p style="font-weight: bolder;margin: 0;border-bottom: 5px solid blue;">职员和部门</p>
    </t-row>
    <t-row>
      <t-col :span="6">
        <empDeptView />
      </t-col>
      <t-col :span="4">
        
      </t-col>
    </t-row>
    
    <t-row>
      <p style="font-weight: bolder;margin: 0;border-bottom: 5px solid blue;">进程单</p>
    </t-row>
    <t-row>
      <t-col :span="12">
        <efpsView />
      </t-col>

    </t-row>
  </div>
</template>
<script setup lang="ts">
import empDeptView from '../components/dashboard/empDeptView.vue'
import efpsView from '../components/dashboard/efpsView.vue'
</script>
<style lang="scss" scoped>
.wrap {
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 1%;
  height: 98%;
  width: 95%;

}
</style>
  